const mongoose = require("mongoose");
const CategoryModel = require("./models/category");

class Category {
	constructor() {}

	create(data) {
		let Category = new CategoryModel(data);
		return Category.save()
			.then((result) => {
				return result;
			})
			.catch((err) => {
				return err;
			});
	}

	async get(id) {
		return CategoryModel.findById(id);
	}

	async update(data) {
		const result = CategoryModel.updateOne({ _id: data.id }, data);
		return result;
	}

	async delete(id) {
		return CategoryModel.findByIdAndDelete(id);
	}

	async list(pageInfo) {
		return CategoryModel.where().sort({ name: 1 });
	}
}

module.exports = Category;
