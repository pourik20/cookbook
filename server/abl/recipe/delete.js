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

async function DeleteAbl(req, res) {
	try {
		let recipe = req.body;

		const ajv = new Ajv();
		const valid = ajv.validate(schema, recipe);

		if (valid) {
			recipe = await dao.delete(recipe.id);
			res.json(recipe);
		} else {
			res.status(400).json({
				errorMessage: "Validation of input failed.",
				reason: ajv.errors,
			});
		}
	} catch (e) {
		res.status(500).json(e.message);
	}
}

module.exports = DeleteAbl;
