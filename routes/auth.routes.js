/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable no-restricted-syntax, global-require */
module.exports = app => {
  const router = require("express").Router();
  const passport = require("passport");
  const LocalStrategy = require("passport-local").Strategy;
  const bcrypt = require("bcrypt");
  const fs = require("fs");
  const path = require("path");

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    let data = await fs.readFileSync(
      path.resolve(`${__dirname}/../datastore/user.csv`),
      "utf-8"
    );
    data = data.split("\n");
    for (const user of data) {
      const arr = user.split(",");
      if (arr[0] === id) done(null, { id: user[0], email: user[1] });
    }
  });

  /* -------------------------------- */
  /*      PASSPORT CONFIGURATION      */
  /* -------------------------------- */
  passport.use(
    "local.signin",
    new LocalStrategy(
      {
        usernameField: "email"
      },
      async (email, password, done) => {
        let user;
        try {
          let data = await fs.readFileSync(
            path.resolve(`${__dirname}/../datastore/user.csv`),
            "utf-8"
          );
          data = data.split("\n");
          for (const each of data) {
            const arr = each.split(",");
            if (arr[1] === email)
              user = { id: arr[0], email: arr[1], password: arr[2] };
          }
          if (!user)
            return done(null, false, { message: "User does not exist" });
          const match = await bcrypt.compare(password, user.password);
          if (!match) {
            return done(null, false, { message: "Password does not match" });
          }
          return done(null, user);
        } catch (e) {
          // eslint-disable-next-line no-console
          console.log(e);
          return done(e);
        }
      }
    )
  );

  // Let a User register
  app.post("/register", async (req, res) => {
    try {
      const { email, password } = req.body;
      let data = await fs.readFileSync(
        path.resolve(`${__dirname}/../datastore/user.csv`),
        "utf-8"
      );
      data = data.split("\n");
      for (const each of data) {
        const arr = each.split(",");
        if (arr[1] === email) return res.sendStatus(403);
      }
      const input = `${Date.now().toString()},${email},${await bcrypt.hash(
        password,
        8
      )}`;
      await fs.appendFileSync(
        path.resolve(`${__dirname}/../datastore/user.csv`),
        `\n${input}`
      );
      res.sendStatus(200);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: err.message || "SERVER ERROR" });
    }
  });

  // Let a User login
  router.post("/login", passport.authenticate("local.signin"), (req, res) => {
    res.sendStatus(200);
  });

  router.get("/logout", (req, res) => {
    req.logOut();
    res.sendStatus(200);
  });

  app.use("/", router);
};
