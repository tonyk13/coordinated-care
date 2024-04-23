const patientModel = require("../models/patient");

//all_patients
exports.all_patients = async (req, res, next) => {
	try {
		const patients = await patientModel.find().populate("physician", "firstName lastName -_id");
		res.status(200).json(patients);
	} catch (error) {
		next(error);
	}
};

//router.get("/patients/:_id", patientsController.getPatient);
exports.getPatient = async (req, res, next) => {
	try {
		const patientId = req.params._id;
		console.log(patientId);
		const patient = await patientModel.findById(patientId);

		if (!patient) {
			return res.status(404).json({ message: "Patient not found" });
		}

		res.status(200).json(patient);
	} catch (error) {
		console.error("Error fetching patient:", error);
		next(error);
	}
};

//router.put("/patients/update_billing/:_id",patientsController.update_billing);
exports.update_billing = async (req, res, next) => {
	try {
		const patientId = req.params._id;
		console.log("Updating billing for patient ID:", patientId);

		const { insuranceProvider, memberID, effectiveSince, insurancePhoneNumber } = req.body;

		const updatedPatient = await patientModel.findByIdAndUpdate(
			patientId,
			{
				$set: {
					insuranceProvider: insuranceProvider,
					memberID: memberID,
					effectiveSince: effectiveSince,
					insurancePhoneNumber: insurancePhoneNumber,
				},
			},
			{ new: true }
		);

		if (!updatedPatient) {
			return res.status(404).json({ message: "Patient not found" });
		}

		res.status(200).json(updatedPatient);
	} catch (error) {
		console.error("Error updating patient billing:", error);
		res.status(500).json({ error: "Server error" });
		next(error);
	}
};

exports.all_patient_names = async (req, res, next) => {
	try {
		const patients = await patientModel.find({}, "firstName lastName dateOfBirth _id").lean();

		const patientDetails = patients.map((patient) => ({
			id: patient._id,
			name: `${patient.firstName} ${patient.lastName}`,
			dateOfBirth: patient.dateOfBirth,
		}));

		res.status(200).json(patientDetails);
	} catch (error) {
		next(error);
	}
};

//create_patient
exports.create_patient = async (req, res, next) => {
	const { firstName, lastName, dateOfBirth, phoneNumber, address, email, emergencyContact, physician } = req.body;

	try {
		const newPatient = new patientModel({
			firstName,
			lastName,
			dateOfBirth,
			phoneNumber,
			address,
			email,
			emergencyContact,
			physician,
		});

		const savedPatient = await newPatient.save();

		res.status(201).json({ message: "Patient added successfully!", patient: savedPatient });
	} catch (error) {
		console.error("Error creating new patient:", error);
		res.status(500).json({ message: "Failed to add new patient", error: error.message });
	}
};
