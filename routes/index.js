const express = require("express");

const blogRoutes = require("./blog");
const contactUsRoutes = require("./contactUs");

const router = express.Router();
router.use("/blog",blogRoutes);

router.use("/contact-us", contactUsRoutes);

module.exports = router;
