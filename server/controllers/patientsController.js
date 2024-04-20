const patientModel = require("../models/patient");

exports.all_patient_names = async (req, res, next) => {
	try {
		const patients = await patientModel.find({}, "name dateOfBirth _id").lean();

		const patientDetails = patients.map((patient) => ({
			id: patient._id,
			name: patient.name,
			dateOfBirth: patient.dateOfBirth,
		}));

		res.status(200).json(patientDetails);
	} catch (error) {
		next(error);
	}
};
