const express = require("express");
const http = require("http");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

// Initialize app
const app = express();
const server = http.createServer(app);

// Load environment variables
dotenv.config();

// Middlewares
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
const adminRouter = require("./routes/Admin/admin.routes");
const staffRouter = require("./routes/Staff/staff.routes");
const studentRouter = require("./routes/Student/student.routes");

app.use("/", adminRouter);
app.use("/", staffRouter);
app.use("/", studentRouter);

// Variables
const PORT = process.env.PORT || 5000;
const URI = process.env.URI;

// MongoDB Connection
mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connection successful");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });

// Start server
server.listen(PORT, () => {
  console.log(`App is listening at port ${PORT}`);
});
