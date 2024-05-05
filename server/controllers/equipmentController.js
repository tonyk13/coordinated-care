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
