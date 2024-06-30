const express = require("express");

const blogRoutes = require("./blog");

const router = express.Router();
router.use("/blog",blogRoutes);

module.exports = router;
