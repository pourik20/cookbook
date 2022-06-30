const mongoose = require("mongoose");
const RecipeModel = require("./models/recipe");

class Recipe {
	constructor() {}

	async create(data) {
		let Recipe = new RecipeModel(data);
		return Recipe.save()
			.then((result) => {
				return result.populate(["categoryList", "ingredientList.ingredient"]);
			})
			.catch((err) => {
				return err;
			});
	}

	async get(id) {
		return RecipeModel.findById(id).populate([
			"categoryList",
			"ingredientList.ingredient",
		]);
	}

	async update(data) {
		const result = RecipeModel.updateOne({ _id: data.id }, data);
		return result;
	}

	async delete(id) {
		return RecipeModel.findByIdAndDelete(id).populate([
			"categoryList",
			"ingredientList.ingredient",
		]);
	}

	async list(filter) {
		return RecipeModel.find(filter)
			.populate(["categoryList", "ingredientList.ingredient"])
			.sort({ name: 1 });
	}

	async rate(rate) {
		return RecipeModel.updateOne(
			{ _id: rate.id },
			{ $push: { rating: { score: rate.score } } }
		);
	}
}

module.exports = Recipe;
