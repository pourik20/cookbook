const express = require("express");
const router = express();

const GetAbl = require("../abl/category/get");
const CreateAbl = require("../abl/category/create");
const DeleteAbl = require("../abl/category/delete");
const UpdateAbl = require("../abl/category/update");
const ListAbl = require("../abl/category/list");

router.get("/get", async (req, res) => {
	await GetAbl(req, res);
});

router.post("/create", async (req, res) => {
	await CreateAbl(req, res);
});

router.put("/update", async (req, res) => {
	await UpdateAbl(req, res);
});

router.delete("/delete", async (req, res) => {
	await DeleteAbl(req, res);
});

router.get("/list", async (req, res) => {
	await ListAbl(req, res);
});

module.exports = router;
