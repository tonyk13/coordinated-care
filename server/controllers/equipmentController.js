const equipmentModel = require("../models/equipment");

exports.all_equipment_names = async (req, res, next) => {
	try {
		const equipmentList = await equipmentModel.find({}, "equipmentName");

		const equipmentNames = equipmentList.map((equipment) => equipment.equipmentName);

		res.status(200).json(equipmentNames);
	} catch (error) {
		next(error);
	}
};
