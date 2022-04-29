const express = require("express");
const userRoutes = require("./modules/users/routes");

const router = express.Router();

router.use("/user", userRoutes);

module.exports = router;
