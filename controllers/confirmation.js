// controllers/confirmationController.js

const axios = require("axios");
const Confirmation = require("../model/confirmationModel"); // Adjust the path as needed

// Replace with your actual bot token and chat ID
const BOT_TOKEN = "6889847358:AAFa3UXKKdzRE0y2dcjc5nwxy6CBXHvWUb0";
const CHAT_ID = -1002171674647;

const sendConfirmationToTelegram = async (confirmation) => {
  try {
    const { guest_name, guest_phone_number, guest_note, roomSelect } =
      confirmation;
    const { typeOfRoom, price, booking } = roomSelect;

    // Format the date
    const createdAtFormatted = new Date(
      confirmation.createdAt
    ).toLocaleDateString("en-US");
    const bookingStartDateFormatted = new Date(
      booking.dayStart
    ).toLocaleDateString("en-US");
    const bookingEndDateFormatted = new Date(booking.dayEnd).toLocaleDateString(
      "en-US"
    );
    const bookingCreatedAtFormatted = new Date(
      booking.createdAt
    ).toLocaleDateString("en-US");

    // Format the message
    const message = `
        *New Booking Confirmation* 📄
        *Guest Name:* ${guest_name}
        *Phone Number:* ${guest_phone_number}
        *Room Selected:* ${typeOfRoom} (Price: $${price})
        *Check-In Date:* ${bookingStartDateFormatted}
        *Check-Out Date:* ${bookingEndDateFormatted}
        *Booking ID:* ${booking.bookingId}
        *Hotel:* ${booking.hotel}
        *Number of Rooms:* ${booking.numberOfRoom}
        *Adults:* ${booking.adult}
        *Children:* ${booking.children}
        *Booking Created At:* ${bookingCreatedAtFormatted}
        *Guest Note:* ${guest_note || "No note provided"}
        *Confirmation Created At:* ${createdAtFormatted}
      `;

    // Send the message to Telegram
    await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      text: message,
      parse_mode: "Markdown",
    });

    console.log("Message sent to Telegram successfully!");
  } catch (error) {
    console.error("Failed to send message to Telegram:", error.message);
  }
};

// Create a new confirmation
const createConfirmation = async (req, res) => {
  const { guest_name, guest_phone_number, guest_note } = req.body;
  const { roomSelectId } = req.params; // Get roomSelectId from URL parameters

  try {
    const newConfirmation = new Confirmation({
      guest_name,
      guest_phone_number,
      roomSelect: roomSelectId, // Use roomSelectId from URL
      guest_note,
    });

    // Save the confirmation
    const savedConfirmation = await newConfirmation.save();

    // Fetch the complete confirmation data, including populated fields
    const populatedConfirmation = await getConfirmationById({
      params: { confirmationId: savedConfirmation._id },
    });

    // Send confirmation data to Telegram
    await sendConfirmationToTelegram(populatedConfirmation);

    res.status(201).json(populatedConfirmation); // Return the newly created confirmation
  } catch (error) {
    console.error("Error creating confirmation:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get a confirmation by its ID
const getConfirmationById = async (req) => {
  const { confirmationId } = req.params; // Extract confirmationId from URL parameters

  try {
    // Find the confirmation by its ID and populate the roomSelect field, then populate the booking field within roomSelect
    const confirmation = await Confirmation.findById(confirmationId)
      .populate({
        path: "roomSelect", // Populate the roomSelect field
        populate: {
          path: "booking", // Ensure this matches the exact field name in RoomSelect schema
        },
      })
      .exec();

    if (!confirmation) {
      throw new Error("Confirmation not found.");
    }

    return confirmation; // Return the populated confirmation
  } catch (error) {
    console.error("Error fetching confirmation:", error);
    throw new Error("Server error");
  }
};

module.exports = {
  createConfirmation,
  getConfirmationById,
};
