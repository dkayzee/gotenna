/* eslint-disable no-console */
const express = require("express");
const parser = require("body-parser");
const morgan = require("morgan");
const path = require("path");
const fs = require("fs");

const app = express();

app.use(parser.json());
if (process.env.NODE_ENV) {
  app.use(morgan("dev"));
}

app.get("/api/", async (req, res) => {
  try {
    let data = await fs.readFileSync(
      path.resolve(`${__dirname}/datastore/imageurl.csv`),
      "utf-8"
    );
    data = data.split("\n").map(img => {
      const id = img.split("/")[4];
      return id;
    });
    res.json({ images: data });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: err.message || "SERVER ERROR" });
  }
});

app.use("/", express.static(path.join(`${__dirname}/dist`)));

app.get("*/bundle.js", (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/dist/bundle.js`));
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/dist/index.html`));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`****listening on port ${port}****`);
});
