const express = require("express");
const bookingRoutes = require("./routes/bookingRoutes");
const roomSelector = require("./routes/roomSelectRoutes");
const telegramRoutes = require("./routes/telegramRoutes");
const confirmation = require("./routes/confirmationRoutes");
const cors = require("cors");
// express app
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res, next) => {
  res.json({ message: "Hello World" });
});

//Routes
app.use("/api/bookings", bookingRoutes);
app.use("/api/roomSelect", roomSelector);
app.use("/api/telegram", telegramRoutes);
app.use("/api/confirmation", confirmation);

// for sending cookie to frontend

module.exports = app;
