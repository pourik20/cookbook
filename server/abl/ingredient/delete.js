const Ajv = require("ajv").default;
const IngredientDao = require("../../dao/ingredient-dao");
const RecipeDao = require("../../dao/recipe-dao");

let daoIngredient = new IngredientDao();
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
		let ingredient = req.body;

		const ajv = new Ajv();
		const valid = ajv.validate(schema, ingredient);

		if (valid) {
			let recipes = await daoRecipe.list({
				"ingredientList.ingredient": {
					$in: [ingredient.id],
				},
			});
			let result = { recipes: [], ingredient: [] };
			for (let rec of recipes) {
				result.recipes.push(await daoRecipe.delete(rec._id));
			}

			result.ingredient.push(await daoIngredient.delete(ingredient.id));

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
