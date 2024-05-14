const express = require("express");
const router = express.Router();
const roomsController = require("../controllers/roomsController");

// GET request for list of all rooms
router.get("/rooms", roomsController.all_rooms);

// GET request for list of all room numbers
router.get("/rooms/all_room_numbers", roomsController.all_room_numbers);

// GET request for retrieving a room
router.get("/rooms/:_id", roomsController.get_room);

// PUT request for requesting a room
router.put("/room_reservation", roomsController.make_reservation);

router.get("/rooms/:roomId/reservations", roomsController.getRoomReservations);

// POST request for creating a room
router.post("/rooms", roomsController.create_room);

module.exports = router;
