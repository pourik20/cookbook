const Ajv = require("ajv").default;
const CategoryDao = require("../../dao/category-dao");
const RecipeDao = require("../../dao/recipe-dao");

let daoCategory = new CategoryDao();
let daoRecipe = new RecipeDao();

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

async function DeleteAbl(req, res) {
	try {
		let category = req.body;

		const ajv = new Ajv();
		const valid = ajv.validate(schema, category);

		if (valid) {
			let recipes = await daoRecipe.list({
				categoryList: {
					$in: [category.id],
				},
			});
			let result = { recipes: [], category: [] };

			for (let rec of recipes) {
				const indexOfObject = rec.categoryList.findIndex((object) => {
					return object.id === category.id;
				});

				rec.categoryList.splice(indexOfObject, 1);

				result.recipes.push(await daoRecipe.update(rec));
			}

			result.category.push(await daoCategory.delete(category.id));
			res.json(result);
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
