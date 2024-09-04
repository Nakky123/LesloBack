// routes/telegramRoutes.js
const express = require("express");
const router = express.Router();
const telegramController = require("../controllers/telegramController"); // Ensure this path is correct

// Define a POST route to send the room data to Telegram
router.post("/:id", telegramController.sendMessage);

module.exports = router; // Export the router module
