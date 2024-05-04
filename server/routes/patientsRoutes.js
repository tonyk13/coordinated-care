const express = require("express");
const router = express.Router();
const patientsController = require("../controllers/patientsController");
const upload = require("../config/upload");

// // GET request for list of all patients
router.get("/patients", patientsController.all_patients);

//router.put("/patients/updateBilling/:_id", patientsController.update_billing_employee);

// GET request for list of all patient names
router.get("/patients/all_patient_names", patientsController.all_patient_names);

// // POST request for creating a patient
router.post("/patients/add-new", patientsController.create_patient);

router.post("/patients/:_id/charges", patientsController.create_new_charge);

router.put("/patients/update_billing/:_id", patientsController.update_billing);

router.put("/patients/:_id", patientsController.update_patient_info);

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

// GET request for all procedures for an employee
router.get("/patients/get_procedures_for_employee/:_id", patientsController.get_procedures_for_employee);

// PUT request for creating a procedure for a patient
router.put("/patients/new_procedure/:_id", patientsController.new_procedure); 

// PUT request for editing a procedure for a patient
router.put("/patients/update_procedure/:_id", patientsController.update_procedure); 

// POST request for uploading a document for a patient
router.post("/patients/:_id/files/upload", upload.single("fileId"), patientsController.upload_file);

// GET request for retrieving a document for a patient
router.get("/patients/files/:fileId", patientsController.getPatientDocument);

// GET request for retrieving all documents for a patient
router.get("/patients/:_id/documents", patientsController.getPatientDocuments);

module.exports = router;
