const mongoose = require("mongoose");

const Schema = mongoose.Schema({
	name: {
		type: "String",
		minLength: 1,
		maxLength: 255,
		required: true,
	},
	units: {
		type: "String",
		minLength: 1,
		maxLength: 10,
		required: true,
	},
});

const Ingredient = mongoose.model("ingredient", Schema);

module.exports = Ingredient;
