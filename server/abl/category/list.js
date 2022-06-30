const CategoryDao = require("../../dao/category-dao");

let dao = new CategoryDao();

async function ListAbl(req, res) {
	try {
		const category = await dao.list();
		res.json(category);
	} catch (e) {
		res.status(500).send(e);
	}
}

module.exports = ListAbl;
