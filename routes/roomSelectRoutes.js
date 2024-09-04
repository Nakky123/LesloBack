// src/routes/roomSelectRoutes.js
const express = require("express");
const router = express.Router();
const roomSelectController = require("../controllers/roomSelectController");

// Create a new room selection with bookingId as URL parameter
router.post("/create/:bookingId", roomSelectController.createRoomSelect);

// Get all room selections
router.get("/", roomSelectController.getRoomSelects);

// Get room selection by ID
router.get("/:id", roomSelectController.getRoomSelectById);

// Delete a room selection by ID
router.delete("/:id", roomSelectController.deleteRoomSelect);

module.exports = router;
