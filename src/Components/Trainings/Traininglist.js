import React, { useEffect, useState } from "react";

import { AgGridReact } from "ag-grid-react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

import Addcustomer from "./Addcustomer";

function Traininglist() {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    fetchTrainings();
  }, []);

  const deleteTrainings = (params) => {
    console.log(params);
    fetch(params, { method: "DELETE" }).then((response) => {
      if (response.ok) fetchTrainings();
      else alert("Something terrible happened");
    });
  };

  const saveTrainings = (training) => {
    window.confirm("Are you sure?");
    fetch("https://customerrest.herokuapp.com/api/trainings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(training),
    })
      .then((res) => fetchTrainings())
      .catch((err) => console.error(err));
  };

  const fetchTrainings = () => {
    fetch("https://customerrest.herokuapp.com/api/trainings")
      .then((response) => response.json())
      .then((data) => setTrainings(data.content))
      .catch((err) => console.error(err));
  };

  const columns = [
    { field: "date", sortable: true, filter: true },
    { field: "durationinmins", sortable: true, filter: true },
    { field: "activity", sortable: true, filter: true, width: 100 },
    { field: "customer", sortable: true, filter: true },

    {
      headerName: "",
      width: 100,
      field: "links[0].href",
      cellRendererFramework: (params) => (
        <IconButton
          color="secondary"
          onClick={() => deleteTrainings(params.data.links[0].href)}
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <div
      className="ag-theme-material"
      style={{ height: 600, width: "90%", margin: "auto" }}
    >
      <Addcustomer saveTrainers={saveTrainings} />
      <AgGridReact
        rowData={trainings}
        columnDefs={columns}
        pagination={true}
        paginationPageSize={10}
        suppressCellSelection={true}
      />
    </div>
  );
}

export default Traininglist;
