const Ajv = require("ajv").default;
const CategoryDao = require("../../dao/category-dao");

let dao = new CategoryDao();

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

async function GetAbl(req, res) {
	try {
		let category = req.query.id ? req.query : req.body;

		const ajv = new Ajv();
		const valid = ajv.validate(schema, category);
		if (valid) {
			category = await dao.get(category.id);
			res.json(category);
		} else {
			return res
				.status(400)
				.json({ error: `Validation of input failed.`, reason: ajv.errors });
		}
	} catch (e) {
		res.status(500).json(e.message);
	}
}

module.exports = GetAbl;
