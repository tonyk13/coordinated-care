const roomModel = require("../models/room");

exports.all_room_numbers = async (req, res, next) => {
	try {
		const rooms = await roomModel.find({}, "roomNumber");
		const roomNumbers = rooms.map((room) => room.roomNumber);

		res.status(200).json(roomNumbers);
	} catch (error) {
		next(error);
	}
};
