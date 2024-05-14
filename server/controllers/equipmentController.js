const equipmentModel = require("../models/equipment");

exports.all_equipment_names = async (req, res, next) => {
	try {
		const equipmentList = await equipmentModel.find({}, "equipmentName").lean();

		const equipmentWithIds = equipmentList.map((equipment) => ({
			id: equipment._id,
			name: equipment.equipmentName,
		}));

		res.status(200).json(equipmentWithIds);
	} catch (error) {
		next(error);
	}
};

exports.all_equipment = async (req, res, next) => {
	try {
		const equipmentList = await equipmentModel
			.find({})
			.select("equipmentName quantity notes status reservations")
			.populate({
				path: "reservations.user",
				select: "firstName lastName email -_id",
			})
			.lean();

		const formattedEquipment = equipmentList.map((equipment) => ({
			id: equipment._id,
			name: equipment.equipmentName,
			quantity: equipment.quantity,
			notes: equipment.notes,
			status: equipment.status,
			reservations: equipment.reservations.map((res) => ({
				date: res.date,
				user: res.user,
			})),
		}));

		res.status(200).json(formattedEquipment);
	} catch (error) {
		next(error);
	}
};

//create_equipment
exports.create_equipment = async (req, res, next) => {
	try {
		const { equipmentName, quantity, notes } = req.body;
		const newEquipment = new equipmentModel({
			equipmentName: equipmentName,
			quantity: quantity,
			notes: notes,
		});

		const savedEquipment = await newEquipment.save();

		res.status(201).json(savedEquipment);
	} catch (error) {
		next(error);
	}
};

//make_reservation
exports.make_reservation = async (req, res, next) => {
	const { equipmentId, date, employeeId } = req.body;
	if (!equipmentId || !date || !employeeId) {
		return res.status(400).json({ message: "Missing required fields" });
	}

	try {
		const equipment = await equipmentModel.findById(equipmentId);
		if (!equipment) {
			return res.status(404).json({ message: "Equipment not found" });
		}

		// Add the reservation
		equipment.reservations.push({
			date: new Date(date),
			user: employeeId,
		});

		await equipment.save();
		res.status(200).json({ message: "Reservation successfully added", equipment });
	} catch (error) {
		console.error("Failed to make reservation:", error);
		next(error);
	}
};

exports.getEquipmentReservations = async (req, res, next) => {
	const { equipmentId } = req.params;
	try {
		const equipment = await equipmentModel.findById(equipmentId).populate("reservations");
		if (!equipment) {
			return res.status(404).json({ message: "Equipment not found" });
		}

		res.status(200).json(equipment.reservations);
	} catch (error) {
		console.error("Failed to fetch equipment reservations:", error);
		next(error);
	}
};

exports.get_an_equipment = async (req, res) => {
	try {
		const equipment = await equipmentModel.findById(req.params._id);

		if (!equipment) {
			return res.status(404).send("Equipment not found");
		}

		res.status(200).json(equipment);
	} catch (error) {
		console.error("Failed to fetch equipment:", error);
		res.status(500).send("Error retrieving equipment");
	}
};
