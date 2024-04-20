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
