const mongoose = require("mongoose");

const roomSelectSchema = new mongoose.Schema(
  {
    typeOfRoom: {
      required: true,
      type: String,
    },
    price: {
      required: true,
      type: Number,
    },
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking", // Reference to the Booking model
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("roomSelect", roomSelectSchema);
