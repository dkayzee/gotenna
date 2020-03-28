import React from "react";
import { Container } from "@material-ui/core";
import Header from "./Layouts/Header";
import Gallery from "./Gallery/Gallery";
import "../styles.css";

const App = () => {
  return (
    <>
      <Header />
      <Container maxWidth="xl">
        <Gallery />
      </Container>
    </>
  );
};

export default App;
