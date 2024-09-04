// routes/confirmationRoutes.js

const express = require("express");
const router = express.Router();
const {
  createConfirmation,
  getConfirmationById,
} = require("../controllers/confirmation");

// Route to create a new confirmation
router.post("/:roomSelectId", createConfirmation); // roomSelectId in URL

// Route to get confirmations by roomSelect ID
router.get("/:confirmationId", getConfirmationById);

module.exports = router;
