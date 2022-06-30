const mongoose = require("mongoose");

const Schema = mongoose.Schema(
	{
		name: {
			type: "String",
			minLength: 1,
			maxLength: 255,
			required: true,
		},
		description: {
			type: "String",
			minLength: 10,
			maxLength: 2500,
			required: true,
		},
		text: [
			{
				type: ["String"],
				minLength: 10,
				maxLength: 8000,
			},
		],
		prepLength: {
			type: "Number",
			min: 1,
			max: 1000,
			required: true,
		},
		ingredientList: [
			{
				ingredient: {
					type: mongoose.SchemaTypes.ObjectId,
					required: true,
					ref: "ingredient",
				},
				amount: {
					type: "String",
					required: true,
				},
			},
		],
		categoryList: [{ type: mongoose.SchemaTypes.ObjectId, ref: "category" }],
		rating: [
			{
				score: { type: "Number", min: 1, max: 10, required: true },
			},
		],
	},
	{ timestamps: true }
);

const Recipe = mongoose.model("recipe", Schema);

module.exports = Recipe;
