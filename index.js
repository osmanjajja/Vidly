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
// Create Route

app.post("/api/generas", (req, res) => {
  // Validate the gener name.

  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  // if true update the genears and redirect the user to course page.
  if (value) {
    const gener = {
      id: generas.length + 1,
      name: req.body.name,
    };
    generas.push(gener);
    return res.send(gener);
  }

  // add to the gener list.
  // redirect user to newly created gener.
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
    return res.send(gener);
  }
});
// Delete route
app.delete("/api/generas/:id", (req, res) => {
  const gener = generas.find((g) => g.id === parseInt(req.params.id));
  if (!gener) {
    return res.status(404).send("Course with given id is not found");
  } else {
    const index = generas.indexOf(gener);
    generas.splice(index);
    return res.send(gener);
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on Port ${port}`);
});
