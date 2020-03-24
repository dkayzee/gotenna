const express = require("express");
const parser = require("body-parser");
const morgan = require("morgan");
const path = require("path");

const app = express();

app.use(parser.json());
if (process.env.NODE_ENV) {
  app.use(morgan("dev"));
}

app.use("/", express.static(path.join(__dirname + "/dist")));

app.get("*/bundle.js", (req, res) => {
  res.sendFile(path.resolve(__dirname + "/dist/bundle.js"));
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname + "/dist/index.html"));
});

let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`****listening on port ${port}****`);
});
