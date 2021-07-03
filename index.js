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

// Update Request

app.put("/api/generas/:id", (req, res) => {
  // Find the generas with given id.
  const gener = generas.find((g) => g.id === parseInt(req.params.id));
  if (!gener) {
    return res.status(404).send("Course with given id is not found");
  }
  // validate the generas.
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  // if true update the genears and redirect the user to course page.
  else {
    gener.name = req.body.name;
    res.send(gener);
    return;
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on Port ${port}`);
});
