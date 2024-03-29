import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import Addcustomer from "../Components/Customers/Addcustomer";
import Editcustomer from "../Components/Customers/Editcustomer";
import CustomerTraininglist from "./Customers/CustomerTraininglist";
import { get,post,put, remove } from "./Utils";
function Customerlist() {
  const [customers, setCustomers] = useState();
  const url = "https://customerrest.herokuapp.com/api/customers"

  useEffect(() => {
    fetchCustomers(url);
    // eslint-disable-next-line
  }, []);

  const deleteCustomer = async(params, firstname, lastname) => {
    var confirm = window.confirm(
      "Press ok to delete customer " + firstname + " " + lastname
    );
    if (confirm === true) {
      const res = await remove(params);
      if(res){
      fetchCustomers();
      }
    }
    else {
      alert("Customer " + firstname + " " + lastname + " was not deleted!");
    }
  };
  
  const updateCustomer = async (customer, url) => {
    const res = await put( customer, url);
    if(res){
      // No unique id provided for customers, so there is a need to fecth customers
      fetchCustomers();
    }   
  };

  const saveCustomer = async (customer) => {
    const res = await post(url, customer);
    if(res){
      setCustomers(customers =>[...customers, res]);
    }   
  };

  const fetchCustomers = async () => {
      const customers =  await get(url); 
      if(customers){
        setCustomers(customers.content);
      }
  };

  const columns = [
    { field: "firstname", sortable: true, filter: true, width: 130 },
    { field: "lastname", sortable: true, filter: true, width: 130 },
    { field: "streetaddress", sortable: true, filter: true, width: 200 },
    { field: "postcode", sortable: true, filter: true, width: 130 },
    { field: "city", sortable: true, filter: true, width: 130 },
    { field: "email", sortable: true, filter: true, width: 200 },
    { field: "phone", sortable: true, filter: true, width: 160 },
    {
      headerName: "trainings",
      field: "links[2].href",
      width: 120,
      cellRendererFramework: (params) => (
        <CustomerTraininglist
          link={params.data.links[2].href}
          firstname={params.data.firstname}
          lastname={params.data.lastname}
        />
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
      width: 60,
      field: "links[0].href",
      cellRendererFramework: (params) => (
        <IconButton
          color="secondary"
          onClick={() =>
            deleteCustomer(
              params.data.links[0].href,
              params.data.firstname,
              params.data.lastname
            )
          }
          id={params.data.id}
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <div
      className="ag-theme-material"
      style={{ height: 700, width: "100%", margin: "auto" }}
    >
      <Addcustomer saveCustomer={saveCustomer} />

      <AgGridReact
        style={{ width: "10%", height: "100%;" }}
        rowHeight={55}
        rowWidth={20}
        rowData={customers}
        columnDefs={columns}
        pagination={true}
        paginationPageSize={20}
        suppressCellSelection={true}
      />
    </div>
  );
}

export default Customerlist;
