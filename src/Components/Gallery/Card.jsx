import React from "react";
import { Grid, Card as CardUI, CardMedia } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  card: {
    backgroundColor: "#1a1a1a"
  },
  cardMedia: {
    width: 400,
    height: 400,
    objectFit: "none"
  }
});

const Card = ({ imageUrl }) => {
  const classes = useStyles();

  return (
    <Grid item>
      <CardUI className={classes.card}>
        <CardMedia
          component="img"
          src={imageUrl}
          className={`${classes.cardMedia} lazyload`}
        />
      </CardUI>
    </Grid>
  );
};

export default Card;
