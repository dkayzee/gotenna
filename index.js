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
    let { page, ipv } = req.query;
    if (!page) page = 1;
    if (!ipv) ipv = 10;
    let data = await fs.readFileSync(
      path.resolve(`${__dirname}/datastore/imageurl.csv`),
      "utf-8"
    );
    /*
      THE COMMENTED CODE BELOW IS FOR WHEN 
      WE WANT TO GRAB A FIXED DIMENSION BY ID
    */
    // data = data.split("\n").map(img => {
    //   const id = img.split("/")[4];
    //   return id;
    // });
    data = data.split("\n");
    const startIndex = (page - 1) * ipv;
    const endIndex = page * ipv;
    res.json(data.slice(startIndex, endIndex));
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: err.message || "SERVER ERROR" });
  }
});

app.use("/", express.static(path.join(`${__dirname}/dist`)));

app.get("*/bundle.js", (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/dist/bundle.js`));
});

app.use(
  "/lazysizes.min.js",
  express.static(
    path.join(`${__dirname}/node_modules/lazysizes/lazysizes.min.js`)
  )
);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/dist/index.html`));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`****listening on port ${port}****`);
});
