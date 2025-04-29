const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
// const errorHandler = require("./src/middlewares/errorHandler");
const connectDB = require("./src/config/db");

const app = express();

app.use(express.json());
// app.use(errorHandler());

app.get("/", (req, res) => {
  res.send("Hello World");
});

const authRoutes = require("./src/routes/auth.routes");
app.use("/api/v1/auth", authRoutes);

connectDB();

const port = 5000 || process.env.PORT;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  console.log(`http://localhost:${port}`);
});
