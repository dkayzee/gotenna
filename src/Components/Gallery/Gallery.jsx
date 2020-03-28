/* eslint-disable no-restricted-syntax */
import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import axios from "axios";

import FormControl from "./FormControl";
import Card from "./Card";
import Pagination from "./Pagination";

export default () => {
  const [images, setImages] = useState([]);
  const [itemsPerView, setItemsPerView] = useState(10);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(5);
  const [total, setTotal] = useState(50);
  const [height, setHeight] = useState([]);
  const [width, setWidth] = useState([]);

  const handleIPVChange = event => {
    setItemsPerView(event.target.value);
    setPage(1);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleHeightChange = event => {
    setHeight(event.target.value);
    setPage(1);
  };

  const handleWidthChange = event => {
    setWidth(event.target.value);
    setPage(1);
  };

  useEffect(() => {
    let API_URL = `/api?ipv=${itemsPerView}&page=${page}`;
    if (height.length) {
      for (const h of height) {
        API_URL += `&height[]=${h}`;
      }
    }
    if (width.length) {
      for (const w of width) {
        API_URL += `&width[]=${w}`;
      }
    }
    const fetchData = async () => {
      const { data } = await axios(API_URL);
      setImages(data.images);
      setTotal(data.total);
    };
    fetchData();
  }, [itemsPerView, page, height, width]);

  useEffect(() => {
    setPagination(Math.max(total / itemsPerView, 1));
  }, [itemsPerView, total]);

  return (
    <Grid
      container
      direction="column"
      justify="space-between"
      alignItems="center"
    >
      <FormControl
        itemsPerView={itemsPerView}
        handleIPVChange={handleIPVChange}
        height={height}
        handleHeightChange={handleHeightChange}
        width={width}
        handleWidthChange={handleWidthChange}
      />
      {images.length ? (
        <>
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
          <Pagination
            pagination={pagination}
            page={page}
            onChange={handlePageChange}
          />
        </>
      ) : (
        <Typography variant="h2" style={{ color: "white" }}>
          No images were found with those dimensions
        </Typography>
      )}
    </Grid>
  );
};
