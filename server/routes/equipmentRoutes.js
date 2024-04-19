const express = require("express");
const router = express.Router();
const equipmentController = require("../controllers/equipmentController");

// // GET request for list of all equipment
// router.get("/equipment", equipmentController.all_equipment);

// GET request for list of all equipment names
router.get("/equipment/all_equipment_names", equipmentController.all_equipment_names);

// // POST request for creating an equipment
// router.post("/equipment/", equipmentController.create_equipment);

// // GET request for retrieving an equipment
// router.get("/equipment/:_id", equipmentController.get_equipment);

// // PUT request for updating an equipment
// router.put("/equipment/:_id", equipmentController.update_equipment);

module.exports = router;
