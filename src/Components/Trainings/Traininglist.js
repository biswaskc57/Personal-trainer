import React, { useState, useEffect } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import { AgGridReact } from "ag-grid-react";
import moment from "moment";

export default function Traininglist() {
  const [training, setTrainings] = useState([]);
  const [update, setUpdate] = useState(0);

  React.useEffect(() => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        setTrainings(responseData);

        console.log(training);
      })
      .catch((error) => console.log(error));
  }, []);

  const columns = [
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
  ];

  return (
    <div
      className="ag-theme-material"
      style={{ height: 600, width: "100%", margin: "auto" }}
    >
      <Tooltip TransitionProps={{ timeout: 600 }} title="Add">
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
      </Tooltip>
    </div>
  );
}
