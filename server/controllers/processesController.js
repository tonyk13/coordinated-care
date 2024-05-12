const processModel = require("../models/process");
const moment = require("moment");
const patientModel = require("../models/patient");
const employeeModel = require("../models/employee");
const roomModel = require("../models/room");
const equipmentModel = require("../models/equipment");
const dayjs = require("dayjs");

exports.all_processes = async (req, res, next) => {
	try {
		const processes = await processModel
			.find()
			.populate("patient", "firstName lastName")
			.populate("physician", "firstName middleName lastName")
			.populate("room", "roomNumber")
			.populate("equipment")
			.populate({
				path: "sections.tasks.assignedTo",
				select: "_id role firstName middleName lastName",
			})
			.exec();

		const formattedProcesses = processes.map((process) => {
			if (!process.patient) {
				return process;
			}

			const patientFullName = [process.patient.firstName, process.patient.lastName].filter(Boolean).join(" ");

			const physicianFullName = [process.physician.firstName, process.physician.middleName, process.physician.lastName]
				.filter(Boolean)
				.join(" ");

			const roomNumber = process.room ? process.room.roomNumber : "No room";

			const equipmentDetails = process.equipment.map((equip) => ({
				id: equip._id,
				name: equip.equipmentName,
				quantity: equip.quantity,
				nextAvailableDate: dayjs(equip.nextAvailableDateAndTime).format("MM/DD/YYYY hh:mm A"),
				notes: equip.notes,
			}));

			const sections = process.sections.map((section) => ({
				...section.toObject(),
				tasks: section.tasks.map((task) => {
					return {
						...task.toObject(),
						assignedTo: task.assignedTo
							? {
									_id: task.assignedTo._id,
									fullName: [task.assignedTo.firstName, task.assignedTo.middleName, task.assignedTo.lastName]
										.filter(Boolean)
										.join(" "),
									role: task.assignedTo.role,
							  }
							: null,
					};
				}),
			}));

			return {
				...process.toObject({ virtuals: true }),
				patientName: patientFullName,
				employeeName: physicianFullName,
				roomNumber: roomNumber,
				equipment: equipmentDetails,
				dateOfBirth: moment(process.dateOfBirth).format("MM/DD/YYYY"),
				lastUpdated: process.lastUpdated,
				admissionDate: process.admissionDate,
				expectedDischarge: process.expectedDischarge,
				sections: sections,
			};
		});

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
		const process = await processModel
			.findById(req.params._id)
			.populate("patient", "firstName lastName")
			.populate("physician", "firstName middleName lastName")
			.populate("room", "roomNumber")
			.populate("equipment", "equipmentName")
			.populate({
				path: "sections.tasks.assignedTo",
				select: "_id role firstName middleName lastName",
			})
			.exec();

		if (!process) {
			return res.status(404).json({ error: "Process not found" });
		}

		const patientFullName = [process.patient.firstName, process.patient.lastName].filter(Boolean).join(" ");
		const physicianFullName = [process.physician.firstName, process.physician.middleName, process.physician.lastName]
			.filter(Boolean)
			.join(" ");
		const roomNumber = process.room ? process.room.roomNumber : "No room";
		const equipmentName = process.equipment ? process.equipment.equipmentName : "No equipment";

		const sections = process.sections.map((section) => ({
			...section.toObject(),
			tasks: section.tasks.map((task) => ({
				...task.toObject(),
				assignedTo: task.assignedTo
					? {
							_id: task.assignedTo._id,
							fullName: [task.assignedTo.firstName, task.assignedTo.middleName, task.assignedTo.lastName]
								.filter(Boolean)
								.join(" "),
							role: task.assignedTo.role,
					  }
					: null,
			})),
		}));

		const formattedProcess = {
			...process.toObject({ virtuals: true }),
			patientName: patientFullName,
			employeeName: physicianFullName,
			roomNumber: roomNumber,
			equipment: equipmentName,
			dateOfBirth: moment(process.dateOfBirth).format("MM/DD/YYYY"),
			lastUpdated: process.lastUpdated,
			admissionDate: process.admissionDate,
			expectedDischarge: process.expectedDischarge,
			sections: sections,
		};

		console.log("Formatted Process:", formattedProcess);

		return res.json(formattedProcess);
	} catch (error) {
		console.error("Error fetching process", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

exports.update_process = async (req, res) => {
	const { sections, lastUpdated } = req.body;

	try {
		const process = await processModel.findById(req.params._id);
		if (!process) {
			return res.status(404).json({ message: "Process not found" });
		}

		process.sections = sections;
		process.lastUpdated = lastUpdated || new Date();

		await process.save();
		res.json({ message: "Process updated successfully", process });
	} catch (error) {
		console.error("Failed to update process:", error);
		res.status(500).json({ error: "Internal server error", details: error.message });
	}
};

exports.create_process = async (req, res, next) => {
	try {
		const process = new processModel({
			...req.body,
		});

		await process.save();

		return res.status(201).json(process);
	} catch (error) {
		next(error);
	}
};
