/* eslint-disable no-nested-ternary */
import React, { useState } from "react";
import { Container } from "@material-ui/core";
import Header from "./Layouts/Header";
import Gallery from "./Gallery/Gallery";
import Login from "./Authentication/Login";
import Register from "./Authentication/Register";
import "../styles.css";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [register, setRegister] = useState(false);
  return (
    <>
      <Header
        loggedIn={loggedIn}
        register={register}
        setLoggedIn={setLoggedIn}
        setRegister={setRegister}
      />
      <Container maxWidth="xl">
        {loggedIn ? (
          <Gallery />
        ) : register ? (
          <Register setRegister={setRegister} />
        ) : (
          <Login setLoggedIn={setLoggedIn} />
        )}
      </Container>
    </>
  );
};

export default App;
