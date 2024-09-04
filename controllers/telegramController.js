// controllers/telegramController.js
const axios = require("axios");

// Replace with your actual bot token
const BOT_TOKEN = "6889847358:AAFa3UXKKdzRE0y2dcjc5nwxy6CBXHvWUb0";
const CHAT_ID = 1217553008; // Replace with your chat ID

// Controller function to send room data to Telegram
exports.sendMessage = async (req, res) => {
  const { roomId } = req.params; // Use req.params to extract roomId from the URL

  try {
    // Fetch data from the specified URL
    const response = await axios.get(
      `http://localhost:3000/api/confirmation/${roomId}`
    );
    const roomData = response.data; // Assuming the response is in JSON format

    // Format the message
    const message = `Room Data for Room ID ${roomId}:\n\n${JSON.stringify(
      roomData,
      null,
      2
    )}`; // Pretty-print JSON

    // Send the message to Telegram
    const telegramResponse = await axios.post(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        chat_id: CHAT_ID,
        text: message,
        parse_mode: "Markdown", // Use 'HTML' if you prefer HTML formatting
      }
    );

    if (telegramResponse.data.ok) {
      res
        .status(200)
        .json({ message: "Message sent to Telegram successfully!" });
    } else {
      console.error("Telegram API error:", telegramResponse.data);
      res.status(500).json({
        error:
          "Failed to send message to Telegram. " +
          telegramResponse.data.description,
      });
    }
  } catch (error) {
    console.error(
      "Error fetching room data or sending message:",
      error.message
    );
    res.status(500).json({
      error: "Error fetching room data or sending message: " + error.message,
    });
  }
};
