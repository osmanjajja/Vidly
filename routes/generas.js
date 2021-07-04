const express = require("express");
const Joi = require("joi");
const router = express.Router();

const generas = [
  { id: 1, name: "Action" },
  { id: 2, name: "Horror" },
  { id: 3, name: "Thrill" },
  { id: 4, name: "Sci-Fi" },
];

// Read request
router.get("/", (req, res) => {
  res.send(generas);
});
// Create Route

router.post("/", (req, res) => {
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

router.put("/:id", (req, res) => {
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
router.delete("/:id", (req, res) => {
  const gener = generas.find((g) => g.id === parseInt(req.params.id));
  if (!gener) {
    return res.status(404).send("Course with given id is not found");
  } else {
    const index = generas.indexOf(gener);
    generas.splice(index, 1);
    return res.send(gener);
  }
});

module.exports = router;
