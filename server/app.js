const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
var errorHandler = require("api-error-handler");

const recipeRouter = require("./controller/recipe-controller");
const categoryRouter = require("./controller/category-controller");
const ingredientRouter = require("./controller/ingredient-controller");

const app = express();

const dbURI =
	"mongodb+srv://admin:uzovka9983@uucookbook.877zm.mongodb.net/cookbook?retryWrites=true&w=majority";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 3000;

app.use(
	cors({
		origin: "*",
	})
);

app.use("/recipe", recipeRouter);
app.use("/category", categoryRouter);
app.use("/ingredient", ingredientRouter);

app.use(errorHandler());

mongoose
	.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then((result) => {
		app.listen(port, () => {
			console.log("Server is listening on port: " + port);
		});
	})
	.catch((err) => console.log(err));
