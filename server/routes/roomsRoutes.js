const express = require("express");
const router = express.Router();
const roomsController = require("../controllers/roomsController");

// // GET request for list of all rooms
router.get("/rooms", roomsController.all_rooms);

// GET request for list of all room numbers
router.get("/rooms/all_room_numbers", roomsController.all_room_numbers);

// // POST request for creating a room
// router.post("/rooms/", roomsController.create_room);

// GET request for retrieving a room
router.get("/rooms/:_id", roomsController.get_room);

// // PUT request for updating a room
// router.put("/rooms/:_id", roomsController.update_room);

module.exports = router;
