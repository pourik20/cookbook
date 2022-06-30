const Ajv = require("ajv").default;
const RecipeDao = require("../../dao/recipe-dao");

let dao = new RecipeDao();

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
		description: {
			type: "string",
			title: "The description Schema",
		},
		text: {
			type: "array",
			title: "The text Schema",
			items: {
				type: "string",
				title: "A Schema",
			},
		},
		prepLength: {
			type: "integer",
			title: "The prepLength Schema",
		},
		ingredientList: {
			type: "array",
			title: "The ingredientList Schema",
			items: {
				type: "object",
				title: "A Schema",
				required: ["ingredient", "amount"],
				properties: {
					ingredient: {
						type: "string",
						title: "The ingredient Schema",
					},
					amount: {
						type: "string",
						title: "The amount Schema",
					},
				},
			},
		},
		categoryList: {
			type: "array",
			title: "The categoryList Schema",
			items: {
				type: "string",
				title: "A Schema",
			},
		},
	},
};

async function UpdateAbl(req, res) {
	try {
		let recipe = req.body;

		const ajv = new Ajv();
		const valid = ajv.validate(schema, recipe);
		if (valid) {
			recipe = await dao.update(recipe);
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

module.exports = UpdateAbl;
