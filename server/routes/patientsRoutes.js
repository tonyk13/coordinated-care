const express = require("express");
const router = express.Router();
const patientsController = require("../controllers/patientsController");

// // GET request for list of all patients
// router.get("/patients", patientsController.all_patients);

// GET request for list of all patient names
router.get("/patients/all_patient_names", patientsController.all_patient_names);

// // POST request for creating a patient
// router.post("/patients/", patientsController.create_patient);

// // GET request for retrieving a patient
// router.get("/patients/:_id", patientsController.get_patient);

// // PUT request for updating a patient
// router.put("/patients/:_id", patientsController.update_patient);

module.exports = router;
