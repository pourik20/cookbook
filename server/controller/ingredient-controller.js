const express = require("express");
const router = express();

const GetAbl = require("../abl/ingredient/get");
const CreateAbl = require("../abl/ingredient/create");
const DeleteAbl = require("../abl/ingredient/delete");
const UpdateAbl = require("../abl/ingredient/update");
const ListAbl = require("../abl/ingredient/list");

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
