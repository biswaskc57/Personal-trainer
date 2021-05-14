import React from "react";
import Button from "@material-ui/core/Button";

import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

import TimerIcon from "@material-ui/icons/Timer";
export default function Addtraining(props) {
  const [open, setOpen] = React.useState(false);
  const [training, setTraining] = React.useState({
    date: "",
    duration: "",
    activity: "",
    customer: "none",
  });
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    setTraining({ ...training, [e.target.name]: e.target.value });
  };

  const handleCustomerChange = (event) => {
    if (event.target.value === "none") {
      setTraining({ ...training, customer: "none" });
    } else {
      setTraining({
        ...training,
        customer: props.customers[event.target.value].links[0].href,
      });
    }
    //console.log(training.customer);
  };

  const addTraining = () => {
    props.saveTraining(training);
    handleClose();
  };
  const [value, setValue] = React.useState(30);
  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 100) {
      setValue(100);
    }
  };
  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
    handleInputChange(event);
  };
  return (
    <div style={{ margin: "auto" }}>
      <Button
        style={{ margin: 10 }}
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
      >
        Add training
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">New training</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="date"
            value={training.date}
            type="Date"
            onChange={(e) => handleInputChange(e)}
            fullWidth
          />

          <TextField
            autoFocus
            margin="dense"
            name="duration"
            value={training.duration}
            type="number"
            onChange={(e) => handleInputChange(e)}
            fullWidth
          />

          <TextField
            margin="dense"
            name="activity"
            value={training.activity}
            onChange={(e) => handleInputChange(e)}
            label="Activity"
            fullWidth
          />
          <Typography id="input-slider" gutterBottom>
            Duration
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <TimerIcon />
            </Grid>
            <Grid item xs>
              <Slider
                name="duration"
                type="number"
                value={typeof value === "number" ? value : 0}
                onChange={handleSliderChange}
                aria-labelledby="input-slider"
              />
            </Grid>

            <TextField
              margin="dense"
              name="duration"
              value={value}
              onChange={(e) => handleInputChange(e)}
              label="Duration"
              fullWidth
              inputProps={{
                min: 0,
                max: 100,
                type: "number",
                "aria-labelledby": "input-slider",
              }}
            />
            <select
              style={{ width: "60%", height: "40%" }}
              name="customer"
              onChange={handleCustomerChange}
              defaultValue={""}
              required
            >
              <option value="" disabled hidden>
                Select
              </option>
              {props.customers.map((customer, index) => (
                <option key={index} value={index}>
                  {customer.firstname + " " + customer.lastname}
                </option>
              ))}
            </select>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={addTraining} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
