const IngredientDao = require("../../dao/ingredient-dao");

let dao = new IngredientDao();

async function ListAbl(req, res) {
	try {
		const ingredient = await dao.list();
		res.json(ingredient);
	} catch (e) {
		res.status(500).send(e);
	}
}

module.exports = ListAbl;
