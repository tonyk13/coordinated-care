const employeeModel = require("../models/employee");

exports.all_physician_names = async (req, res, next) => {
	try {
		const physicians = await employeeModel.find({ role: "Doctor" }, "firstName middleName lastName _id");

		console.log("Physicians: ", physicians);

		const physicianNames = physicians.map((physician) => {
			let fullName = `${physician.firstName}`;
			if (physician.middleName) {
				fullName += ` ${physician.middleName}`;
			}
			fullName += ` ${physician.lastName}`;
			return { id: physician._id, name: fullName };
		});

		res.status(200).json(physicianNames);
	} catch (error) {
		next(error);
	}
};

exports.get_employee = async (req, res, next) => {
	const employee_id = req.params._id;
	try {
	  const employee = await employeeModel.findById(employee_id);
	  if (!employee) {
		return res.status(404).json({ error: "Employee Not Found" });
	  }
	  res.json({ employee: employee })
	} catch (error) {
	  next(error);
	}
};

exports.update_employee = async (req, res, next) => {
    const employee_id = req.params._id;
    try {
        const employee = await employeeModel.findByIdAndUpdate(employee_id, 
			{ firstName: req.body.firstName },
			{ middleName: req.body.middleName },
			{ lastName: req.body.middleName },
			{ username: req.body.middleName },
			{ phoneNumber: req.body.middleName },
			{ dateOfBirth: req.body.middleName },
		);
		
        if (!employee) {
            return res.status(404).json({ error: "Employee Not Found" });
        }
        
        res.json({ response: req.body });
    } catch (error) {
        next(error);
    }
};

exports.get_employee_by_email = async (req, res, next) => {
    const employee_email = req.body.email;
    try {
        const employee = await employeeModel.findOne({ email: employee_email });
        if (!employee) {
            return res.status(404).json({ error: "Employee Not Found" });
        }
        res.json({ employee_id: employee._id.toString() });
    } catch (error) {
        next(error);
    }
};

exports.get_privacy_settings = async (req, res, next) => {
    const employeeId = req.params.id;
    try {
        const employee = await employeeModel.findById(employeeId);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        const privacySettings = employee.privacySettings;
        res.json({ privacySettings });
    } catch (error) {
        next(error);
    }
};

exports.update_privacy_settings = async (req, res, next) => {
    const employee_id = req.params.id;
	const { privacySettings } = req.body;
    try {
        const employee = await employeeModel.findByIdAndUpdate(employee_id, 
            { privacySettings },
        );
        
        if (!employee) {
            return res.status(404).json({ error: "Employee Not Found" });
        }
        
		res.json({ response: req.body });
    } catch (error) {
        next(error);
    }
};

exports.get_notification_settings = async (req, res, next) => {
    const employeeId = req.params.id;
    try {
        const employee = await employeeModel.findById(employeeId);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        const notificationSettings = employee.notificationSettings;
        res.json({ notificationSettings });
    } catch (error) {
        next(error);
    }
};

exports.update_notification_settings = async (req, res, next) => {
    const employee_id = req.params.id;
	const { notificationSettings } = req.body;
    try {
        const employee = await employeeModel.findByIdAndUpdate(employee_id, 
            { notificationSettings },
        );
        
        if (!employee) {
            return res.status(404).json({ error: "Employee Not Found" });
        }
        
		res.json({ response: req.body });
    } catch (error) {
        next(error);
    }
};