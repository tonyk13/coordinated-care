const express = require("express");
const router = express.Router();
const patientsController = require("../controllers/patientsController");

// // GET request for list of all patients
router.get("/patients", patientsController.all_patients);


//router.put("/patients/updateBilling/:_id", patientsController.update_billing_employee);

// GET request for list of all patient names
router.get("/patients/all_patient_names", patientsController.all_patient_names);

// // POST request for creating a patient
router.post("/patients/add-new", patientsController.create_patient);

router.put("/patients/update_billing/:_id",patientsController.update_billing);

// // GET request for retrieving a patient
// router.get("/patients/:_id", patientsController.get_patient);

// // PUT request for updating a patient
// router.put("/patients/:_id", patientsController.update_patient);
router.get("/patients/:_id", patientsController.getPatient);

// GET request for appointments for a patient
router.get("/patients/get_appointments/:_id", patientsController.get_appointments);

// PUT request for creating an appointment for a patient
router.put("/patients/new_appointment/:_id", patientsController.new_appointment);

// PUT request for updating an appointment for a patient
router.put("/patients/update_appointment/:_id", patientsController.update_appointment);

// GET request for procedures for a patient
router.get("/patients/get_procedures/:_id", patientsController.get_procedures);

// PUT request for creating a procedure for a patient
router.put("/patients/new_procedure/:_id", patientsController.new_procedure);

module.exports = router;
