const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// JSON parsing middleware
app.use(express.json());

// CORS middleware
app.use(function (req, res, next) {
  const allowedOrigins = [
    "http://localhost:4000",
    "https://netflix-clone053.netlify.app",
    "https://admin-dashboard-o430.onrender.com",
    "https://admin-dashboard053.netlify.app",
    "https://reliable-cucurucho-e36724.netlify.app",
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Private-Network", true);
  next();
});

// Handle OPTIONS requests
app.options("*", (req, res) => {
  res.status(200).end();
});

// Routes
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const movieRoute = require("./routes/movies");
const listRoute = require("./routes/lists");

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/movies", movieRoute);
app.use("/api/lists", listRoute);

// Database connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

// Health check route
app.get("/healthz", (req, res) => {
  console.log("Health check is processed");
  return res.sendStatus(204);
});

// Server setup
const port = process.env.PORT || 8800;

app.get("/", (req, res) => {
  res.send("hello world!!!");
});

app.listen(port, () => {
  console.log(`Backend service is running on port ${port}`);
});
