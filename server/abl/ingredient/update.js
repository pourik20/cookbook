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
		name: {
			type: "string",
			title: "The name Schema",
		},
		units: {
			type: "string",
			title: "The units Schema",
		},
	},
};

async function UpdateAbl(req, res) {
	try {
		let ingredient = req.body;

		const ajv = new Ajv();
		const valid = ajv.validate(schema, ingredient);
		if (valid) {
			ingredient = await dao.update(ingredient);
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

module.exports = UpdateAbl;
