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

exports.get_employee_by_email = async (req, res, next) => {
    const employee_email = req.body.email;
    try {
        const employee = await employeeModel.findOne({ email: employee_email });
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        console.log(employee);
        res.json({ employee_id: employee._id });
    } catch (error) {
        next(error);
    }
};