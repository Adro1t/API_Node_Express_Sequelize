const recordController = require("../controllers/recordController");

const router = require("express").Router();

/* The code is defining different routes for handling HTTP requests related to records. */
router.post("/add", recordController.addRecord);

router.get("/list", recordController.recordList);

router.get("/details/:id", recordController.singleRecord);

router.put("/update/:id", recordController.updateRecord);

router.delete("/delete/:id", recordController.deleteRecord);

module.exports = router;
