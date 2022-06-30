const Ajv = require("ajv").default;
const RecipeDao = require("../../dao/recipe-dao");

let dao = new RecipeDao();

let schema = {
	title: "Root Schema",
	type: "object",
	required: ["id"],
	properties: {
		id: {
			title: "The id Schema",
			type: "string",
		},
	},
};

async function GetAbl(req, res) {
	try {
		let recipe = req.query.id ? req.query : req.body;

		const ajv = new Ajv();
		const valid = ajv.validate(schema, recipe);
		if (valid) {
			recipe = await dao.get(recipe.id);
			res.json(recipe);
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
