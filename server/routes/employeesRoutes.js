const express = require("express");
const router = express.Router();
const employeesController = require("../controllers/employeesController");

// // GET request for list of all employees
// router.get("/employees", employeesController.all_employees);

// GET request for list of all physician names
router.get("/employees/all_physician_names", employeesController.all_physician_names);

// // POST request for creating an employee
// router.post("/employees/", employeesController.create_employee);

// GET request for retrieving an employee
router.get("/employees/:_id", employeesController.get_employee);

// PUT request for updataing an employee
router.put("/employees/:_id", employeesController.update_employee);


// Get request for retrieving an employee id by email (used when setting cookie)
router.post("/employees/get_employee_by_email", employeesController.get_employee_by_email);



// GET request for retrieving privacy settings of an employee by id
router.get("/employees/:id/get_privacy_settings", employeesController.get_privacy_settings);

// PUT request for updating privacy settings of an employee by id
router.put("/employees/:id/update_privacy_settings", employeesController.update_privacy_settings);

// GET request for retrieving notification settings of an employee by id
router.get("/employees/:id/get_notification_settings", employeesController.get_notification_settings);

// PUT request for updating notification settings of an employee by id
router.put("/employees/:id/update_notification_settings", employeesController.update_notification_settings);


module.exports = router;
