/* eslint-disable no-console, array-callback-return, consistent-return */
const express = require("express");
const passport = require("passport");
const session = require("express-session");
const parser = require("body-parser");
const morgan = require("morgan");
const redis = require("redis");
const path = require("path");
const fs = require("fs");

const app = express();
const redisClient = redis.createClient(6379);

app.use(parser.json());
app.use(morgan("dev"));
app.use(
  session({
    secret: "gotenna",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: "auto",
      maxAge: 1000 * 60 * 60 // 1 hour
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

// echo redis errors to the console
redisClient.on("error", err => {
  console.error(`Error: ${err}`);
});

require("./routes/auth.routes")(app);

app.get("/api/", async (req, res) => {
  try {
    const key = req.originalUrl;
    redisClient.get(key, (err, cachedImageUrls) => {
      if (cachedImageUrls) {
        const images = JSON.parse(cachedImageUrls);
        const total = images.length;
        res.json({ images, total });
      } else {
        let { page, ipv } = req.query;
        const { height, width, grayscale } = req.query;
        if (!page) page = 1;
        if (!ipv) ipv = 10;
        fs.readFile(
          path.resolve(`${__dirname}/datastore/imageurl.csv`),
          "utf-8",
          (e, imgUrls) => {
            if (e) throw new Error("File is corrupt or unaccessible");
            else {
              let data = imgUrls.split("\n");
              if (height && width) {
                data = data.filter(url => {
                  const imgHeight = url.split("/")[6];
                  const imgWidth = url.split("/")[5];
                  if (height.includes(imgHeight) && width.includes(imgWidth))
                    return url;
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

              if (grayscale) {
                data = data.map(url => {
                  const newUrl = `${url}?grayscale`;
                  return newUrl;
                });
              }
              const startIndex = (page - 1) * ipv;
              const endIndex = page * ipv;
              const images = data.slice(startIndex, endIndex);
              redisClient.set(key, JSON.stringify(images));
              const total = data.length;
              res.json({ images, total });
            }
          }
        );
      }
    });
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

app.get("/gotenna_favicon.ico", (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/dist/gotenna_favicon.ico`));
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/dist/index.html`));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`****listening on port ${port}****`);
});
