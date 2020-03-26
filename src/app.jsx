import React from "react";
import { Container } from "@material-ui/core";

import Header from "./components/Header";
import Gallery from "./components/Gallery";
import "./styles.css";

const App = () => {
  return (
    <Container disableGutters maxWidth="xl">
      <Header />
      <h1>Hello World</h1>
      <Gallery />
    </Container>
  );
};

export default App;
