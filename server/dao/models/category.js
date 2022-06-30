const mongoose = require("mongoose");

const Schema = mongoose.Schema({
	name: {
		type: "String",
		minLength: 1,
		maxLength: 255,
		required: true,
	},
	description: {
		type: "String",
		maxLength: 255,
	},
});

const Category = mongoose.model("category", Schema);

module.exports = Category;
