const Ajv = require("ajv").default;

const RecipeDao = require("../../dao/recipe-dao");
let dao = new RecipeDao();

let schema = {
	type: "object",
	required: [
		"name",
		"description",
		"text",
		"prepLength",
		"ingredientList",
		"categoryList",
	],
	properties: {
		name: {
			title: "The name Schema",
			type: "string",
			default: "",
			maxLength: 255,
			minLength: 1,
		},
		description: {
			title: "The description Schema",
			type: "string",
			default: "",
			maxLength: 8000,
		},
		text: {
			title: "The text Schema",
			type: "array",
			items: {
				title: "A Schema",
				type: "string",
				maxLength: 8000,
			},
			maxItems: 32,
		},
		prepLength: {
			title: "The prepLength Schema",
			type: "integer",
		},
		ingredientList: {
			title: "The ingredientList Schema",
			type: "array",
			items: {
				title: "A Schema",
				type: "object",
				required: ["ingredient", "amount"],
				properties: {
					ingredient: {
						title: "The ingredient Schema",
						type: "string",
					},
					amount: {
						title: "The amount Schema",
						type: "string",
					},
				},
			},
			minItems: 1,
			maxItems: 32,
		},
		categoryList: {
			title: "The categoryList Schema",
			type: "array",
			items: {
				title: "A Schema",
				type: "string",
			},
			minItems: 1,
			maxItems: 32,
		},
	},
};

async function Create(req, res) {
	try {
		let recipe = req.body;

		const ajv = new Ajv();
		const valid = ajv.validate(schema, recipe);
		if (valid) {
			recipe = await dao.create(recipe);
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

module.exports = Create;
