const express = require("express");
const router = express();

const GetAbl = require("../abl/recipe/get");
const CreateAbl = require("../abl/recipe/create");
const DeleteAbl = require("../abl/recipe/delete");
const UpdateAbl = require("../abl/recipe/update");
const ListAbl = require("../abl/recipe/list");
const RateAbl = require("../abl/recipe/rate");

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

router.post("/list", async (req, res) => {
	await ListAbl(req, res);
});

router.post("/rate", async (req, res) => {
	await RateAbl(req, res);
});

module.exports = router;
