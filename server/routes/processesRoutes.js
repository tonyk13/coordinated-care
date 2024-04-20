const express = require("express");
const router = express.Router();
const processesController = require("../controllers/processesController");

// GET request for list of all processes
router.get("/processes", processesController.all_processes);

// POST request for creating a process
router.post("/processes/", processesController.create_process);

// GET request for retrieving a process (for Process View page)
router.get("/processes/:_id", processesController.get_process);

// PUT request for a process (updating a process)
router.put("/processes/:_id", processesController.update_process);

// POST request for creating a process
router.post("/processes", processesController.create_process);

module.exports = router;
