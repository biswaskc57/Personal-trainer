import React, { useEffect, useState } from "react";

import { AgGridReact } from "ag-grid-react";
import IconButton from "@material-ui/core/IconButton";

import DeleteIcon from "@material-ui/icons/Delete";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

import Addcustomer from "../Components/Customers/Addcustomer";
import Editcustomer from "../Components/Customers/Editcustomer";
import CustomerTraininglist from "./Customers/CustomerTraininglist";

function Customerlist() {
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

/*import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

function Row(props) {
  const { row } = props;
  console.log(row);
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  const [customers, setCustomers] = useState([]);

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="customer">
          {row.firstname}
        </TableCell>
        <TableCell component="th" scope="customer">
          {row.lastname}
        </TableCell>
        <TableCell component="th" scope="customer">
          {row.streetaddress}
        </TableCell>
        <TableCell component="th" scope="customer">
          {row.city}
        </TableCell>
        <TableCell component="th" scope="customer">
          {row.email}
        </TableCell>
        <TableCell component="th" scope="customer">
          {row.id}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Trainings
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Activity</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {customers.map((index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {customers}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  customer: PropTypes.shape({
    firstname: PropTypes.string.isRequired,
  }),
};

export default function CollapsibleTable() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);
  const fetchCustomers = () => {
    fetch("https://customerrest.herokuapp.com/api/customers")
      .then((response) => response.json())
      .then((data) => setCustomers(data.content))
      .catch((err) => console.error(err));
    console.log(customers);
  };
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>First Name</TableCell>
            <TableCell align="right">last name</TableCell>
            <TableCell align="right">Address</TableCell>
            <TableCell align="right">City</TableCell>
            <TableCell align="right">email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers.map((customers, index) => (
            <Row key={index} row={customers} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}*/
