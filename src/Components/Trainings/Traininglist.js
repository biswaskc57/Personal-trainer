import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import moment from "moment";
import Addtraining from "./Addtraining";
import IconButton from "@material-ui/core/IconButton";
import { get, post, remove } from "../Utils";

import DeleteIcon from "@material-ui/icons/Delete";
export default function Traininglist() {
  const [trainings, setTrainings] = useState([]);
  const [customers, setCustomers] = useState([]);
  const urlTraining = "https://customerrest.herokuapp.com/gettrainings"
  const urlCustomers = "https://customerrest.herokuapp.com/api/customers"
  
  useEffect(() => {
    fetchTrainings();
    fetchCustomers();
    // eslint-disable-next-line
  }, []);

  const fetchTrainings = async() => {
    const trainings =  await get(urlTraining); 
      if(trainings){
        setTrainings(trainings);
      }
  };

  const saveTrainings = async (training) => {
    const res = await post('https://customerrest.herokuapp.com/api/trainings', training);
    if(res){
      // Data gets modified in the back-end,so there is a need to fetch trainings.
      fetchTrainings();
    } 
  };

  const fetchCustomers = async () => {
    const customers =  await get(urlCustomers); 
    if(customers){
      setCustomers(customers.content);
    }
  };

  const deleteTraining = async(params) => {
    let confirm = window.confirm("Press Ok to delete training no " + params);
    const url = `https://customerrest.herokuapp.com/api/trainings/${params}`
    if (confirm === true) {
      const res = await remove(url);
      if(res){
      fetchTrainings();
      }
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
        rowData={trainings.map((item) => ({
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
