const patientModel = require("../models/patient");

exports.all_patient_names = async (req, res, next) => {
	try {
		const patients = await patientModel.find({}, "name");
		const patientNames = patients.map((patient) => patient.name);
		res.status(200).json(patientNames);
	} catch (error) {
		next(error);
	}
};
