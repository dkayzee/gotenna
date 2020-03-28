import React from "react";
import { Pagination } from "@material-ui/lab";
import { Grid } from "@material-ui/core";

export default ({ pagination, page, onChange }) => (
  <Grid container direction="row" justify="center" alignItems="center">
    <Pagination count={pagination} page={page} onChange={onChange} />
  </Grid>
);
