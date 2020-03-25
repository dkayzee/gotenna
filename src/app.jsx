import React from "react";
import axios from "axios";
import { Container } from "@material-ui/core";

import Header from "./components/Header";
import Gallery from "./components/Gallery";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      images: null
    };
  }

  async componentDidMount() {
    const { data } = await axios("/api/");
    this.setState({ images: data.images });
  }

  render() {
    const { images } = this.state;
    return (
      <Container>
        <Header />
        <h1>Hello World</h1>
        <Gallery images={images} />
      </Container>
    );
  }
}

export default App;
