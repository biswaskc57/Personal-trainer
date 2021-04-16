import React, { useEffect, useState } from "react";

import { AgGridReact } from "ag-grid-react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

function Carlist() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const deleteCustomer = (params) => {
    console.log(params);
    fetch(params, { method: "DELETE" }).then((response) => {
      if (response.ok) fetchCustomers();
      else alert("Something terrible happened");
    });
  };
  const fetchCustomers = () => {
    fetch("https://customerrest.herokuapp.com/api/customers")
      .then((response) => response.json())
      .then((data) => setCustomers(data.content))
      .catch((err) => console.error(err));
  };

  const columns = [
    { field: "firstname", sortable: true, filter: true },
    { field: "lastname", sortable: true, filter: true },
    { field: "streetaddress", sortable: true, filter: true, width: 100 },
    { field: "postcode", sortable: true, filter: true },
    { field: "city", sortable: true, filter: true, width: 100 },
    { field: "email", sortable: true, filter: true },
    { field: "phone", sortable: true, filter: true },
    {
      headerName: "",
      width: 100,
      field: "links[0].href",
      cellRendererFramework: (params) => (
        <IconButton
          color="secondary"
          onClick={() => deleteCustomer(params.data.links[0].href)}
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
      <AgGridReact
        rowData={customers}
        columnDefs={columns}
        pagination={true}
        paginationPageSize={10}
        suppressCellSelection={true}
      />
    </div>
  );
}

export default Carlist;
