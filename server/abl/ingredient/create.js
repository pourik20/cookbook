const Ajv = require("ajv").default;
const IngredientDao = require("../../dao/ingredient-dao.js");

let dao = new IngredientDao();

let schema = {
	type: "object",
	title: "Root Schema",
	required: ["name", "units"],
	properties: {
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

async function CreateAbl(req, res) {
	try {
		let ingredient = req.body;

		const ajv = new Ajv();
		const valid = ajv.validate(schema, ingredient);
		if (valid) {
			ingredient = await dao.create(ingredient);
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

module.exports = CreateAbl;
