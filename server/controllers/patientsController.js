const patientModel = require("../models/patient");
const employeeModel = require("../models/employee");

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

// Get Appointments for a patient
// New Appointment for a patient (Need to implement adding a physician)
exports.get_appointments = async (req, res) => {
    const patient_id = req.params._id;

    try {
		const patient = await patientModel.findById(patient_id);
		if (!patient) {
            return res.status(404).json({ success: false, message: 'Patient not found' });
        }
		res.status(200).json({ appointments: patient.appointments });
	} catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: req.body});
    }
};


// New Appointment for a patient
exports.new_appointment = async (req, res) => {
    const patient_id = req.params._id;
    const { dateTime, providerAssigned, typeOfProcedure, status } = req.body;

    try {
		const patient = await patientModel.findById(patient_id);
        if (!patient) {
            return res.status(404).json({ success: false, message: 'Patient not found' });
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
        res.status(500).json({ success: false, message: req.body});
    }
};

// Update an appointment for a patient
exports.update_appointment = async (req, res) => {
    const patient_id = req.params._id;

    try {
		const patient = await patientModel.findById(patient_id);
		if (!patient) {
            return res.status(404).json({ success: false, message: 'Patient not found' });
        }

		// Updating Appointment
		const appointment_id = req.body._id.toString();
    	const updatedAppointmentData = req.body;
		const appointmentIndex = patient.appointments.findIndex(appointment => appointment._id.toString() === appointment_id);

        if (appointmentIndex === -1) {
            return res.status(404).json({ success: false, message: appointmentIndex });
        }
        patient.appointments[appointmentIndex] = updatedAppointmentData;
		await patient.save();

		res.status(200).json({ data: req.body });
	} catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: req.body});
    }
};
