const RoomSelect = require("../model/roomSelectModel"); // Adjust path as necessary
const Booking = require("../model/bookingModel"); // Adjust path as necessary

// Create a new room selection
exports.createRoomSelect = async (req, res) => {
  try {
    const { typeOfRoom, price } = req.body;
    const { bookingId } = req.params; // Get bookingId from URL parameters

    // Check if the booking exists
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const roomSelect = new RoomSelect({
      price,
      typeOfRoom,
      booking: bookingId,
    });

    await roomSelect.save();
    res.status(201).json(roomSelect);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all room selections with booking details
exports.getRoomSelects = async (req, res) => {
  try {
    const roomSelects = await RoomSelect.find().populate("booking"); // Populate booking data
    res.status(200).json(roomSelects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get room selection by ID with booking details
exports.getRoomSelectById = async (req, res) => {
  try {
    const roomSelect = await RoomSelect.findById(req.params.id).populate(
      "booking"
    ); // Populate booking data
    if (!roomSelect) {
      return res.status(404).json({ message: "Room selection not found" });
    }
    res.status(200).json(roomSelect);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a room selection
exports.deleteRoomSelect = async (req, res) => {
  try {
    const roomSelect = await RoomSelect.findByIdAndDelete(req.params.id);
    if (!roomSelect) {
      return res.status(404).json({ message: "Room selection not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
