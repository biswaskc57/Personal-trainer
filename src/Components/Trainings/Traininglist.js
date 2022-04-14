import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import moment from "moment";
import Addtraining from "./Addtraining";
import IconButton from "@material-ui/core/IconButton";
import { get } from "../Utils";

import DeleteIcon from "@material-ui/icons/Delete";
export default function Traininglist() {
  const [training, setTrainings] = useState([]);
  const [customers, setCustomers] = useState([]);
  const url = "https://customerrest.herokuapp.com/gettrainings"
  useEffect(() => {
    fetchTrainings(url);
    fetchCustomers();
    // eslint-disable-next-line
  }, []);
  const fetchTrainings = async() => {
    const trainings =  await get(url); 
      if(trainings){
        setTrainings(trainings);
      }
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
  const fetchCustomers = () => {
    fetch("https://customerrest.herokuapp.com/api/customers")
      .then((response) => response.json())
      .then((data) => setCustomers(data.content))
      .catch((err) => console.error(err));
    console.log(customers);
  };

  const deleteTraining = (params) => {
    var confirm = window.confirm("Press Ok to delete training no " + params);
    console.log(params);
    if (confirm == true) {
      fetch("https://customerrest.herokuapp.com/api/trainings/" + params, {
        method: "DELETE",
      }).then((response) => {
        if (response.ok) {
          fetchTrainings();
          alert("Training " + params + " has been deleted");
        } else alert("Something terrible happened");
      });
    } else {
      alert("Training " + params + " was not deleted!");
    }
  };

  const columns = [
    {
      headerName: "Id",
      field: "id",
      sortable: true,
      filter: true,
      resizable: true,
      width: 120,
      marginRight: 100,
    },
    {
      headerName: "Activity",
      field: "activity",
      sortable: true,
      filter: true,
      resizable: true,
    },
    {
      headerName: "Duration",
      field: "duration",
      sortable: true,
      filter: true,
      resizable: true,
    },

    {
      headerName: "Date",
      field: "date",
      sortable: true,
      filter: true,
      resizable: true,
    },
    {
      headerName: "Customer",
      field: "customer",
      sortable: true,
      filter: true,
      resizable: true,
    },
    {
      headerName: "",
      width: 100,
      field: "id",
      cellRendererFramework: (params) => (
        <IconButton
          color="secondary"
          onClick={() => deleteTraining(params.data.id)}
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <div
      className="ag-theme-material"
      style={{ height: 600, width: "100%", margin: "auto" }}
    >
      <Addtraining saveTraining={saveTrainings} customers={customers} />
      <AgGridReact
        style={{ width: "100%", height: "100%;" }}
        rowHeight={60}
        rowWidth={200}
        columnDefs={columns}
        rowData={training.map((item) => ({
          ...item,
          date: moment(item.date).format("LLL"),

          duration: item.duration + " min.",

          customer: item.customer.firstname + " " + item.customer.lastname,
        }))}
        pagination={true}
        paginationPageSize={10}
        suppressCellSelection={true}
      />
    </div>
  );
}
