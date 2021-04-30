import React, { useEffect, useState } from "react";

import moment from "moment";
import { Table } from "react-bootstrap";

import Button from "@material-ui/core/Button";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function CustomerTraininglist(props) {
  const [training, setTrainings] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    fetch(props.link)
      .then((response) => response.json())
      .then((data) => setTrainings(data.content))
      .catch((err) => console.error(err));
  };

  const handleClickOpen = () => {
    console.log(props.link);

    console.log(training);

    console.log(training.content);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button color="primary" onClick={handleClickOpen}>
        Training
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        style={{ width: 2000 }}
      >
        <DialogTitle id="form-dialog-title">Trainings</DialogTitle>
        <DialogContent>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Training ID</th>
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
                    <td>{training.duration}</td>
                    <td>{training.activity}</td>
                  </tr>
                </tbody>
              ))}
          </Table>

          <Button color="primary">View all training</Button>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  );
}
