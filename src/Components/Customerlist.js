import React, { useEffect, useState } from "react";

import { AgGridReact } from "ag-grid-react";
import IconButton from "@material-ui/core/IconButton";

import DeleteIcon from "@material-ui/icons/Delete";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Addcustomer from "../Components/Customers/Addcustomer";
import Editcustomer from "../Components/Customers/Editcustomer";
import CustomerTraininglist from "./Customers/CustomerTraininglist";

function Customerlist() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchCustomers();
    // eslint-disable-next-line
  }, []);

  const deleteCustomer = (params) => {
    console.log(params);
    fetch(params, { method: "DELETE" }).then((response) => {
      if (response.ok) fetchCustomers();
      else alert("Something terrible happened");
    });
  };

  const updateCustomer = (customer, link) => {
    window.confirm("Are you sure?");
    fetch(link, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
    })
      .then((res) => fetchCustomers())
      .catch((err) => console.error(err));
  };
  const saveCustomer = (customer) => {
    window.confirm("Are you sure?");
    fetch("https://customerrest.herokuapp.com/api/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
    })
      .then((res) => fetchCustomers())
      .catch((err) => console.error(err));
  };

  const fetchCustomers = () => {
    fetch("https://customerrest.herokuapp.com/api/customers")
      .then((response) => response.json())
      .then((data) => setCustomers(data.content))
      .catch((err) => console.error(err));
    console.log(customers);
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
      headerName: "trainings",
      field: "links[2].href",
      width: 130,
      cellRendererFramework: (params) => (
        <CustomerTraininglist link={params.data.links[2].href} />
      ),
    },
    {
      headerName: "",
      field: "links[0].href",
      width: 100,
      cellRendererFramework: (params) => (
        <Editcustomer updateCustomer={updateCustomer} customer={params.data} />
      ),
    },
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
      <Addcustomer saveCustomer={saveCustomer} />

      <AgGridReact
        style={{ width: "100%", height: "100%;" }}
        rowHeight={60}
        rowData={customers}
        columnDefs={columns}
        pagination={true}
        paginationPageSize={10}
        suppressCellSelection={true}
      />
    </div>
  );
}

export default Customerlist;
