const express = require("express");
const router = express.Router();

const user = require("./user");
const admin = require("./admin");
const resultLog = require("./resultLog");

router.get("/api/v1", async (req, res)=>{

});

router.use("/api/user", user);
router.use("/api/admin", admin);
router.use("/api/resultLog", resultLog);

module.exports = router;