const processModel = require("../models/process");
const moment = require("moment");
const patientModel = require("../models/patient");
const employeeModel = require("../models/employee");
const roomModel = require("../models/room");
const equipmentModel = require("../models/equipment");

exports.all_processes = async (req, res, next) => {
	try {
		const processes = await processModel
			.find()
			.populate("patient", "name")
			.populate("physician", "firstName middleName lastName")
			.populate("room", "roomNumber")
			.populate("equipment", "equipmentName")
			.exec();

		// console.log(processes);

		const formattedProcesses = processes.map((process) => {
			if (!process.patient) {
				// console.log(`Process with ID ${process._id} has no patient.`);
				return process;
			}

			const fullName = [process.physician.firstName, process.physician.middleName, process.physician.lastName]
				.filter(Boolean)
				.join(" ");

			// console.log(fullName);

			const roomNumber = process.room ? process.room.roomNumber : "No room";

			const equipmentName = process.equipment ? process.equipment.equipmentName : "No equipment";

			// console.log(equipment);

			return {
				...process.toObject({ virtuals: true }),
				patientName: process.patient.name,
				employeeName: fullName,
				roomNumber: roomNumber,
				equipment: equipmentName,
				dateOfBirth: moment(process.dateOfBirth).format("MM/DD/YYYY"),
				lastUpdated: moment(process.lastUpdated).format("MM/DD/YYYY"),
				admissionDate: moment(process.admissionDate).format("MM/DD/YYYY"),
				expectedDischarge: moment(process.expectedDischarge).format("MM/DD/YYYY"),
			};
		});

		// console.log(formattedProcesses);

		res.json(formattedProcesses);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: "Internal server error" });
	}
};

exports.create_process = async (req, res, next) => {
	try {
		const process = new processModel(req.body);

		await process.save();

		return res.status(201).json(process);
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
};

exports.get_process = async (req, res) => {
	try {
		const process = await processModel.findById(req.params._id).exec();

		if (!process) {
			return res.status(404).json({ error: "Process not found" });
		}

		return res.json(process);
	} catch (error) {
		res.status(500).json({ error: "Internal server error" });
	}
};

// This one might take a minute
exports.update_process = async (req, res) => {
	try {
	} catch (error) {
		res.status(500).json({ error: "Internal server error" });
	}
};
