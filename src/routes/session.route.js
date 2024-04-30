const express = require("express");
const router = express.Router();
const { checkStatus } = require("../controllers/session.controller");

router.get("/", checkStatus);

module.exports = router;
