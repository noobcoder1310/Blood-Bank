const express = require("express");
const authmiddleware = require("../middleware/authmiddleware");
const { getDonorsController } = require("../controller/inventorycontroller");
const { bloodGroupDetailsController } = require("../controller/analyticsController");
const router = express.Router();

router.get("/bloodGroups-data", authmiddleware,bloodGroupDetailsController );

module.exports = router;
