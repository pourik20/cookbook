const Ajv = require("ajv").default;
const RecipeDao = require("../../dao/recipe-dao");

let dao = new RecipeDao();

let schema = {
	type: "object",
	title: "Root Schema",
	properties: {
		filter: {
			type: "object",
			title: "The filter Schema",
		},
	},
	required: ["filter"],
};

async function ListAbl(req, res) {
	try {
		let body = req.body;

		const ajv = new Ajv();
		const valid = ajv.validate(schema, body);
		if (valid) {
			const recipe = await dao.list(body.filter);
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

module.exports = ListAbl;
