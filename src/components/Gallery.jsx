import React from "react";
import { Grid } from "@material-ui/core";

import Card from "./Card";

const Gallery = ({ images }) => {
  return images ? (
    <Grid container direction="row" justify="center" alignItems="center">
      {images.map(image => (
        <Card image={image} />
      ))}
    </Grid>
  ) : (
    <div>Loading</div>
  );
};

export default Gallery;
