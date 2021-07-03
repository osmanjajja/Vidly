const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());

const generas = [
  { id: 1, name: "Action" },
  { id: 2, name: "Horror" },
  { id: 3, name: "Thrill" },
  { id: 4, name: "Sci-Fi" },
];

// Read request.
app.get("/", (req, res) => {
  res.send("Welcome to Vidly App.");
});
// Read request
app.get("/api/generas", (req, res) => {
  res.send(generas);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on Port ${port}`);
});
