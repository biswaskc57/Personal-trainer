import React from "react";
import Button from "@material-ui/core/Button";

import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

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
  };

  const addTraining = () => {
    props.saveTraining(training);
    handleClose();
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
        style={{ width: "60%", color: "green" }}
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle
          id="form-dialog-title"
          style={{ margin: "auto", color: "green" }}
        >
          New training
        </DialogTitle>
        <DialogContent style={{ margin: "auto", width: "70%" }}>
          <TextField
            autoFocus
            margin="dense"
            name="date"
            value={training.date}
            type="datetime-local"
            onChange={(e) => handleInputChange(e)}
            fullWidth
          />

          <TextField
            autoFocus
            margin="dense"
            name="duration"
            value={training.duration}
            label="Duration"
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

          <select
            style={{
              width: "100%",
              height: "50%",
              marginTop: "5%",
              border: "collapse",
            }}
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
