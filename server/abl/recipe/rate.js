const Ajv = require("ajv").default;
const RecipeDao = require("../../dao/recipe-dao");

let dao = new RecipeDao();

let schema = {
	title: "Root Schema",
	type: "object",
	required: ["id", "score"],
	properties: {
		id: {
			title: "The id Schema",
			type: "string",
		},
		score: {
			title: "The rating Schema",
			type: "integer",
			maximum: 10,
			minimum: 0,
		},
	},
};

async function RateAbl(req, res) {
	try {
		let recipe = req.body;

		const ajv = new Ajv();
		const valid = ajv.validate(schema, recipe);
		if (valid) {
			recipe = await dao.rate(recipe);
			res.json(recipe);
		} else {
			return res
				.status(400)
				.json({ error: `Validation of input failed.`, reason: ajv.errors });
		}
	} catch {
		res.status(500).json(e.message);
	}
}

module.exports = RateAbl;
