import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Pagination } from "@material-ui/lab";
import {
  Grid,
  Select,
  MenuItem,
  FormControl,
  Input,
  InputLabel,
  Checkbox,
  ListItemText
} from "@material-ui/core";
import axios from "axios";

import Card from "./Card";

const useStyles = makeStyles(theme => ({
  formIPVControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  formDimControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300
  }
}));

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 40 * 4.5 + 8,
      width: 100
    }
  }
};

const defaultDimensions = [100, 200, 250, 300, 400];

const Gallery = () => {
  const classes = useStyles();
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [itemsPerView, setItemsPerView] = useState(10);
  const [pagination, setPagination] = useState(5);
  const [height, setHeight] = useState([]);
  const [width, setWidth] = useState([]);

  const handleIPVChange = event => {
    setItemsPerView(event.target.value);
    setPagination(50 / event.target.value);
    setPage(1);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleHeightChange = event => {
    setHeight(event.target.value);
  };

  const handleWidthChange = event => {
    setWidth(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios("/api/");
      setImages(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios(`/api?ipv=${itemsPerView}&page=${page}`);
      setImages(data);
    };
    fetchData();
  }, [itemsPerView, page]);

  return (
    <Grid
      container
      direction="column"
      justify="space-between"
      alignItems="center"
    >
      <Grid container direction="row" justify="flex-end" alignItems="center">
        <FormControl className={classes.formIPVControl}>
          <InputLabel id="items-per-view-label">Items Per Page</InputLabel>
          <Select
            labelId="items-per-view-label"
            value={itemsPerView}
            onChange={handleIPVChange}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.formDimControl}>
          <InputLabel id="multiple-height-label">Height</InputLabel>
          <Select
            labelId="multiple-height-label"
            multiple
            value={height}
            onChange={handleHeightChange}
            input={<Input />}
            renderValue={selected => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {defaultDimensions.map(h => (
              <MenuItem key={h} value={h}>
                <Checkbox checked={height.indexOf(h) > -1} />
                <ListItemText primary={h} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className={classes.formDimControl}>
          <InputLabel id="multiple-width-label">Width</InputLabel>
          <Select
            labelId="multiple-width-label"
            multiple
            value={width}
            onChange={handleWidthChange}
            input={<Input />}
            renderValue={selected => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {defaultDimensions.map(w => (
              <MenuItem key={w} value={w}>
                <Checkbox checked={width.indexOf(w) > -1} />
                <ListItemText primary={w} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={3}
      >
        {images.map(imageUrl => {
          const id = imageUrl.split("/")[4];
          return <Card imageUrl={imageUrl} key={id} />;
        })}
      </Grid>
      <Grid container direction="row" justify="center" alignItems="center">
        <Pagination
          count={pagination}
          page={page}
          onChange={handlePageChange}
        />
      </Grid>
    </Grid>
  );
};

export default Gallery;
