const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// JSON parsing middleware
app.use(express.json());

// CORS middleware
app.use((req, res, next) => {
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
    "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, token"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Private-Network", true);
  // Set the Access-Control-Max-Age header
  res.setHeader("Access-Control-Max-Age", 7200);
  next();
});

// Preflight handling for OPTIONS requests
app.options("*", (req, res) => {
  // Check if the request is valid
  if (
    req.headers.origin &&
    (req.headers.origin.includes("https://netflix-clone053.netlify.app") ||
      req.headers.origin.includes(
        "https://admin-dashboard-o430.onrender.com"
      ) ||
      req.headers.origin.includes("https://admin-dashboard053.netlify.app")) &&
    [
      "GET",
      "HEAD",
      "PUT",
      "PATCH",
      "POST",
      "DELETE",
      "OPTIONS",
      "CONNECT",
      "TRACE",
    ].includes(req.headers["access-control-request-method"]) &&
    [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "Authorization",
      "token",
    ].every((header) =>
      req.headers["access-control-request-headers"].includes(header)
    )
  ) {
    return res.sendStatus(204); // Successful preflight response
  } else {
    return res.sendStatus(403); // Forbidden
  }
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
