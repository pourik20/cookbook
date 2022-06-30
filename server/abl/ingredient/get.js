const Ajv = require("ajv").default;
const IngredientDao = require("../../dao/ingredient-dao");

let dao = new IngredientDao();

let schema = {
	type: "object",
	title: "Root Schema",
	required: ["id"],
	properties: {
		id: {
			type: "string",
			title: "The id Schema",
		},
	},
};

async function GetAbl(req, res) {
	try {
		let ingredient = req.query.id ? req.query : req.body;

		const ajv = new Ajv();
		const valid = ajv.validate(schema, ingredient);
		if (valid) {
			ingredient = await dao.get(ingredient.id);
			res.json(ingredient);
		} else {
			return res
				.status(400)
				.json({ error: `Validation of input failed.`, reason: ajv.errors });
		}
	} catch (e) {
		res.status(500).json(e.message);
	}
}

module.exports = GetAbl;
