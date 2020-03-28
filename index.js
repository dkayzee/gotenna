/* eslint-disable no-console, array-callback-return, consistent-return */
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
    const { height, width } = req.query;
    if (!page) page = 1;
    if (!ipv) ipv = 10;
    let data = await fs.readFileSync(
      path.resolve(`${__dirname}/datastore/imageurl.csv`),
      "utf-8"
    );
    data = data.split("\n");
    if (height && width) {
      data = data.filter(url => {
        const imgHeight = url.split("/")[6];
        const imgWidth = url.split("/")[5];
        if (height.includes(imgHeight) && width.includes(imgWidth)) return url;
      });
    } else if (height) {
      data = data.filter(url => {
        const imgHeight = url.split("/")[6];
        if (height.includes(imgHeight)) return url;
      });
    } else if (width) {
      data = data.filter(url => {
        const imgWidth = url.split("/")[5];
        if (width.includes(imgWidth)) return url;
      });
    }
    const startIndex = (page - 1) * ipv;
    const endIndex = page * ipv;
    const images = data.slice(startIndex, endIndex);
    const total = data.length;
    res.json({ images, total });
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
