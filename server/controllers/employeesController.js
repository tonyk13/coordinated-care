const employeeModel = require("../models/employee");

exports.all_physician_names = async (req, res, next) => {
	try {
		const physicians = await employeeModel.find({ role: "Doctor" }, "firstName middleName lastName");

		const physicianNames = physicians.map((physician) => {
			let fullName = physician.firstName;
			if (physician.middleName) {
				fullName += ` ${physician.middleName}`;
			}
			fullName += ` ${physician.lastName}`;
			return fullName;
		});

		res.status(200).json(physicianNames);
	} catch (error) {
		next(error);
	}
};
