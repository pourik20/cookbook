const mongoose = require("mongoose");
const IngredientModel = require("./models/ingredient");

class Ingredient {
	constructor() {}

	create(data) {
		let Ingredient = new IngredientModel(data);
		return Ingredient.save()
			.then((result) => {
				return result;
			})
			.catch((err) => {
				return err;
			});
	}

	async get(id) {
		return IngredientModel.findById(id);
	}

	async update(data) {
		const result = IngredientModel.updateOne({ _id: data.id }, data);
		return result;
	}

	async delete(id) {
		return IngredientModel.findByIdAndDelete(id);
	}

	async list(pageInfo) {
		return IngredientModel.where().sort({ name: 1 });
	}
}

module.exports = Ingredient;
