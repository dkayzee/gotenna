import React from "react";
import { Grid, Card as CardUI, CardMedia } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: 400
  }
});

const Card = ({ imageUrl }) => {
  const classes = useStyles();

  return (
    <Grid item>
      {/* <CardUI className={classes.root}> */}
      <CardUI>
        <CardMedia component="img" src={imageUrl} className="lazyload" />
        {/* <img src={`https://picsum.photos/id/${image}/400/400`} alt="something" /> */}
        <p>Card Number</p>
      </CardUI>
    </Grid>
  );
};

export default Card;
