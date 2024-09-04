const Booking = require("../model/bookingModel");

// Helper function to generate zero-padded booking ID
const generateBookingId = async () => {
  const latestBooking = await Booking.findOne(
    {},
    {},
    { sort: { bookingId: -1 } }
  );
  let newId = 1;
  if (latestBooking && latestBooking.bookingId) {
    newId = parseInt(latestBooking.bookingId, 10) + 1;
  }
  return newId.toString().padStart(9, "0"); // Pad to 9 digits
};

// Booking controller
exports.createBooking = async (req, res) => {
  try {
    const bookingId = await generateBookingId();
    const booking = new Booking({ ...req.body, bookingId });
    const savedBooking = await booking.save(); // Save booking to database

    // Return response with bookingId and _id (ObjectId)
    res.status(201).json({
      message: "Booking created successfully",
      bookingId: savedBooking.bookingId,
      _id: savedBooking._id.toString(), // Convert ObjectId to string if needed
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(400).json({ error: error.message });
  }
};

// Get all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error.message); // Log error to the terminal
    res.status(500).json({ error: error.message });
  }
};

// Get a single booking by ID
exports.getBookingById = async (req, res) => {
  try {
    // Use req.params.id to find the booking by _id
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json(booking);
  } catch (error) {
    console.error("Error fetching booking by ID:", error.message); // Log error to the terminal
    res.status(500).json({ error: error.message });
  }
};

// Update a booking
exports.updateBooking = async (req, res) => {
  try {
    const { hotel, dayStart, dayEnd, pax, typeOfRoom, month } = req.body;

    // Validate required fields
    if (!hotel || !dayStart || !dayEnd || !pax || !typeOfRoom || !month) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const booking = await Booking.findOneAndUpdate(
      { bookingId: req.params.id },
      { hotel, dayStart, dayEnd, pax, typeOfRoom, month },
      { new: true }
    );
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json({ message: "Booking updated successfully", booking });
  } catch (error) {
    console.error("Error updating booking:", error.message); // Log error to the terminal
    res.status(400).json({ error: error.message });
  }
};

// Delete a booking
exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findOneAndDelete({
      bookingId: req.params.id,
    });
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error("Error deleting booking:", error.message); // Log error to the terminal
    res.status(500).json({ error: error.message });
  }
};
