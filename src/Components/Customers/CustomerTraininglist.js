import React, { useEffect } from "react";

import moment from "moment";
import { Table } from "react-bootstrap";

import Button from "@material-ui/core/Button";
import { get } from "../Utils";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import "../../App.css";

export default function CustomerTraininglist(props) {
  const [training, setTrainings] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    fetchCustomers();
    // eslint-disable-next-line
  }, []);

  const fetchCustomers = async () => {
    const customers =  await get(props.link); 
    if(customers){
      setTrainings(customers.content);
    }
};

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ height: 600, width: "90%", margin: "auto" }}>
      <Button color="primary" onClick={handleClickOpen}>
        Training
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle
          id="form-dialog-title"
          style={{ margin: "auto", color: "green" }}
        >
          {" "}
          {props.firstname + " " + props.lastname}'s Training:
        </DialogTitle>
        <DialogContent>
          <Table striped bordered hover class="customerTable">
            <thead>
              <tr>
                <th>Id</th>
                <th>Date</th>
                <th>Duration &nbsp;</th>
                <th>Activity</th>
                <th></th>
              </tr>
            </thead>
            {training
              .filter(
                (i) =>
                  i.date !== null && i.duration != null && i.activity != null
              )

              .map((training, index) => (
                <tbody>
                  <tr key={index}>
                    <td>{training.links[0].href.split("/")[5]}</td>
                    <td>
                      {moment(training.date).format("MMMM DD YYYY, h:mm")}
                    </td>
                    <td>{training.duration} min</td>
                    <td>{training.activity}</td>
                  </tr>
                </tbody>
              ))}
          </Table>
        </DialogContent>
        <DialogActions>
          <Button color="primary">View all training</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
