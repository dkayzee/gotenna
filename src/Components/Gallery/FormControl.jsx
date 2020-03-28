import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  Grid,
  Select,
  MenuItem,
  FormControl,
  FormControlLabel,
  Input,
  InputLabel,
  Checkbox,
  ListItemText,
  Switch
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  formIPVControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  whiteLabel: {
    color: "white"
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

const PurpleSwitch = withStyles({
  switchBase: {
    color: "white",
    "&$checked": { color: "#5847b5" },
    "&$checked + $track": {
      backgroundColor: "#5847b5"
    }
  },
  checked: {},
  track: {}
})(Switch);

const widthDimensions = [100, 250, 300, 400];
const heightDimensions = [100, 200, 250, 300];

export default ({
  itemsPerView,
  handleIPVChange,
  height,
  handleHeightChange,
  width,
  handleWidthChange,
  grayscale,
  handleGrayscaleChange
}) => {
  const classes = useStyles();
  return (
    <Grid
      container
      direction="row"
      justify="flex-end"
      alignItems="center"
      style={{ background: "#1a1a1a", margin: "10px" }}
    >
      <FormControl className={classes.formIPVControl}>
        <InputLabel className={classes.whiteLabel} id="items-per-view-label">
          Items Per Page
        </InputLabel>
        <Select
          labelId="items-per-view-label"
          value={itemsPerView}
          onChange={handleIPVChange}
          classes={{
            root: classes.whiteLabel,
            icon: classes.whiteLabel
          }}
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={25}>25</MenuItem>
          <MenuItem value={50}>50</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formDimControl}>
        <InputLabel className={classes.whiteLabel} id="multiple-height-label">
          Height
        </InputLabel>
        <Select
          labelId="multiple-height-label"
          multiple
          value={height}
          onChange={handleHeightChange}
          input={<Input />}
          renderValue={selected => selected.join(", ")}
          MenuProps={MenuProps}
          classes={{
            root: classes.whiteLabel,
            icon: classes.whiteLabel
          }}
        >
          {heightDimensions.map(h => (
            <MenuItem key={h} value={h}>
              <Checkbox checked={height.indexOf(h) > -1} />
              <ListItemText primary={h} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={classes.formDimControl}>
        <InputLabel className={classes.whiteLabel} id="multiple-width-label">
          Width
        </InputLabel>
        <Select
          labelId="multiple-width-label"
          multiple
          value={width}
          onChange={handleWidthChange}
          input={<Input />}
          renderValue={selected => selected.join(", ")}
          MenuProps={MenuProps}
          classes={{
            root: classes.whiteLabel,
            icon: classes.whiteLabel
          }}
        >
          {widthDimensions.map(w => (
            <MenuItem key={w} value={w}>
              <Checkbox checked={width.indexOf(w) > -1} />
              <ListItemText primary={w} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControlLabel
        style={{ color: "white" }}
        control={
          // eslint-disable-next-line react/jsx-wrap-multilines
          <PurpleSwitch
            checked={grayscale}
            onChange={handleGrayscaleChange}
            name="grayscale"
          />
        }
        label="Grayscale"
      />
    </Grid>
  );
};
