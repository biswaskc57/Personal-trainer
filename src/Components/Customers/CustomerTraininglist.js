import React, { useEffect, useState } from "react";

import { AgGridReact } from "ag-grid-react";

import Button from "@material-ui/core/Button";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

export default function CustomerTraininglist(props) {
  const [training, setTrainings] = React.useState([]);

  const fetchCustomers = (link = props.link) => {
    console.log(link);
    fetch("link")
      .then((response) => response.json())
      .then((data) => setTrainings(data.content))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <Button color="primary">Training</Button>
    </div>
  );
}
