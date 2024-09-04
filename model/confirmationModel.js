const mongoose = require("mongoose");

const confirmationSchema = new mongoose.Schema(
  {
    guest_name: {
      required: true,
      type: String,
    },
    guest_phone_number: {
      required: true,
      type: Number,
    },
    roomSelect: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "roomSelect", // Reference to the Booking model
      required: true,
    },
    booking: [{ type: mongoose.Schema.Types.ObjectId, ref: "Booking" }],
    guest_note: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("confirmation", confirmationSchema);
