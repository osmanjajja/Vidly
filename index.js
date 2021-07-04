const express = require("express");
const generas = require("./routes/generas");
const home = require("./routes/home");
const app = express();

app.use(express.json());
// app.use((req, res, next) => {
//   console.log("Logging.......!");
//   next();
// }); Example of a Custom Middleware Function.
app.use("/api/generas", generas);
app.use("/", home);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on Port ${port}`);
});
