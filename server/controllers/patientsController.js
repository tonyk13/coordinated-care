const patientModel = require("../models/patient");
const employeeModel = require("../models/employee");

const mongoose = require("mongoose");
const Grid = require("gridfs-stream");
const conn = mongoose.connection;
Grid.mongo = mongoose.mongo;
let gfs;

conn.once("open", () => {
	gfs = Grid(conn.db);
});

//all_patients
exports.all_patients = async (req, res, next) => {
	try {
		const patients = await patientModel.find().populate("physician", "firstName middleName lastName -_id");

		const formattedPatients = patients.map((patient) => {
			const physicianFullName = [patient.physician.firstName, patient.physician.middleName, patient.physician.lastName]
				.filter(Boolean)
				.join(" ");

			return {
				...patient.toObject({ virtuals: true }),
				physician: physicianFullName,
			};
		});

		res.status(200).json(formattedPatients);

		// res.status(200).json(patients);
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

// Get Appointments for a patient
exports.get_appointments = async (req, res) => {
	const patient_id = req.params._id;

	try {
		const patient = await patientModel.findById(patient_id);
		if (!patient) {
			return res.status(404).json({ success: false, message: "Patient not found" });
		}
		res.status(200).json({ appointments: patient.appointments });
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, message: req.body });
	}
};

// New Appointment for a patient
exports.new_appointment = async (req, res) => {
	const patient_id = req.params._id;
	const { dateTime, providerAssigned, typeOfProcedure, status } = req.body;

	try {
		const patient = await patientModel.findById(patient_id);
		if (!patient) {
			return res.status(404).json({ success: false, message: "Patient not found" });
		}
		const newAppointment = {
			dateTime: dateTime,
			providerAssigned: providerAssigned,
			typeOfProcedure: typeOfProcedure,
			status: status,
		};
		patient.appointments.push(newAppointment);
		await patient.save();
		res.status(201).json({ success: true, patient });
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, message: req.body });
	}
};

// Update an appointment for a patient
exports.update_appointment = async (req, res) => {
	const patient_id = req.params._id;

	try {
		const patient = await patientModel.findById(patient_id);
		if (!patient) {
			return res.status(404).json({ success: false, message: "Patient not found" });
		}

		// Updating Appointment
		const appointment_id = req.body._id.toString();
		const updatedAppointmentData = req.body;
		const appointmentIndex = patient.appointments.findIndex((appointment) => appointment._id.toString() === appointment_id);

		if (appointmentIndex === -1) {
			return res.status(404).json({ success: false, message: appointmentIndex });
		}
		patient.appointments[appointmentIndex] = updatedAppointmentData;
		await patient.save();

		res.status(200).json({ data: req.body });
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, message: req.body });
	}
};

// Get Procedures for a patient
exports.get_procedures = async (req, res) => {
	const patient_id = req.params._id;
	try {
		const patient = await patientModel.findById(patient_id);
		if (!patient) {
			return res.status(404).json({ success: false, message: "Patient not found" });
		}
		res.status(200).json({ procedures: patient.procedures });
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, message: req.body });
	}
};

// Create Procedure for a patient
exports.new_procedure = async (req, res) => {
	const patient_id = req.params._id;
	const { dateTime, providerAssigned, typeOfProcedure, room } = req.body;

	try {
		const patient = await patientModel.findById(patient_id);
		if (!patient) {
			return res.status(404).json({ success: false, message: "Patient not found" });
		}
		const newProcedure = {
			dateTime: dateTime,
			providerAssigned: providerAssigned,
			typeOfProcedure: typeOfProcedure,
			room: room,
		};
		patient.procedures.push(newProcedure);
		await patient.save();
		res.status(201).json({ success: true, patient });
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, message: req.body });
	}
};

exports.upload_file = async (req, res, next) => {
	if (!req.file) {
		return res.status(400).json({ message: "No file uploaded" });
	}

	try {
		const patientId = req.params._id;
		const { mimetype, size, id } = req.file;

		const newDocument = {
			fileId: new mongoose.Types.ObjectId(id), // Save the _id from GridFS here
			documentName: req.body.documentName,
			uploadedBy: req.body.uploadedBy,
			accessLevel: req.body.accessLevel,
			documentType: req.body.documentType,
			description: req.body.description,
			lastUpdated: new Date(),
			size: size,
			mimeType: mimetype,
		};

		const updatedPatient = await patientModel.findByIdAndUpdate(
			patientId,
			{ $push: { patientDocuments: newDocument } },
			{ new: true, useFindAndModify: false }
		);

		if (!updatedPatient) {
			return res.status(404).json({ message: "Patient not found" });
		}

		res.status(201).json({ message: "File uploaded successfully", document: newDocument });
	} catch (error) {
		console.error("Error uploading file:", error);
		res.status(500).json({ message: "Error uploading file", error: error.message });
		next(error);
	}
};

// Function to get all documents of a specific patient
exports.getPatientDocuments = async (req, res, next) => {
	try {
		const patientId = req.params._id;

		const patient = await patientModel.findById(patientId);

		if (!patient) {
			return res.status(404).json({ message: "Patient not found" });
		}

		const documents =
			patient.patientDocuments?.map((doc) => {
				return {
					fileId: doc.fileId,
					patientId: patientId,
					documentName: doc.documentName,
					uploadedBy: doc.uploadedBy,
					accessLevel: doc.accessLevel,
					documentType: doc.documentType,
					description: doc.description,
					lastUpdated: doc.lastUpdated,
					size: doc.size,
					mimeType: doc.mimeType,
				};
			}) || [];

		// console.log("Documents in controller code:", documents);

		res.status(200).json(documents);
	} catch (error) {
		console.error("Error fetching patient documents:", error);
		res.status(500).json({ message: "Error fetching documents", error: error.message });
		next(error);
	}
};

exports.getPatientDocument = async (req, res, next) => {
	try {
		const fileId = req.params.fileId;

		// Check if the fileId is a valid ObjectId
		if (!mongoose.Types.ObjectId.isValid(fileId)) {
			return res.status(400).json({ message: "Invalid file ID" });
		}

		// Find the file metadata from the uploads.files collection
		const fileMetadata = await mongoose.connection.db.collection("uploads.files").findOne({ _id: new mongoose.Types.ObjectId(fileId) });

		if (!fileMetadata) {
			return res.status(404).json({ message: "File not found" });
		}

		// Check if the file is a PDF
		if (fileMetadata.contentType !== "application/pdf") {
			return res.status(400).json({ message: "Not a PDF file" });
		}

		// Find the file chunks from the uploads.chunks collection
		const chunksQuery = { files_id: new mongoose.Types.ObjectId(fileId) };
		const fileChunks = await mongoose.connection.db.collection("uploads.chunks").find(chunksQuery).sort({ n: 1 }).toArray();

		if (!fileChunks || fileChunks.length === 0) {
			return res.status(404).json({ message: "File data not found" });
		}

		// Combine the file chunks into a single buffer
		const fileBuffer = Buffer.concat(fileChunks.map((chunk) => chunk.data.buffer));

		// Set the appropriate response headers and send the file data
		res.writeHead(200, {
			"Content-Type": "application/pdf",
			"Content-Disposition": `inline; filename="${fileMetadata.filename}"`,
			"Content-Length": fileBuffer.length,
		});
		res.end(fileBuffer);
	} catch (error) {
		console.error("Error fetching patient document:", error);
		res.status(500).json({ message: "Error fetching document", error: error.toString() });
		next(error);
	}
};
