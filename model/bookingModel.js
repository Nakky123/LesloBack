const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    bookingId: {
      type: String, // Changed to String for zero-padded ID
      required: true,
      unique: true,
    },
    hotel: {
      type: String,
      required: true,
    },
    dayStart: {
      type: Date,
      required: true,
    },
    dayEnd: {
      type: Date,
      required: true,
    },
    numberOfRoom: {
      type: Number,
      required: true,
      min: 1,
    },
    adult: {
      type: Number,
      required: true,
      min: 1,
    },
    children: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
