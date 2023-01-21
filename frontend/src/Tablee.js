import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import {
  Button,
  Modal,
  Box,
  FormControl,
  TextField,
  InputAdornment,
  Paper,
  TableBody,
  TableCell,
  Table,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";

// import Modal1 from "./Modal1";

const style = {
  position: "relative",
  // display: "none",
  marginLeft: "auto",
  marginRight: "auto",
  top: "40%",
  // transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#ffffff",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const columns = [
  { id: "empID", label: "Employee ID", maxWidth: 0 },
  { id: "firstName", label: "Employee First Name", minWidth: 200 },
  { id: "lastName", label: "Employee Last Name", minWidth: 200 },
  { id: "emailId", label: "Employee Email Id", minWidth: 150 },
  { id: "action", label: "Action", minWidth: 250 },
];

const Tablee = () => {
  const navigate = useNavigate();
  const [updateOpen, setUpdateOpen] = useState();
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [emppID, setEmppID] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [updateFirstName, setUpdateFirstName] = useState("");
  const [updateLastName, setUpdateLastName] = useState("");
  const [updateEmailId, setUpdateEmailId] = useState("");
  const [empData, setEmpData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/emp/").then((res) => {
      setEmpData(res.data);
      // console.log(res.data);
    });
  }, []);

  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  const handleOpen3 = () => setOpen3(true);
  const handleClose3 = () => setOpen3(false);

  const UpdateData = (e, id) => {
    e.preventDefault();
    // console.log(id);

    setOpen1(true);
    setEmppID(id);
    axios.get(`http://localhost:5000/api/emp/${id}`).then((res) => {
      setFirstName(res.data.firstName);
      setUpdateFirstName(res.data.firstName);
      setLastName(res.data.lastName);
      setUpdateLastName(res.data.lastName);
      setEmailId(res.data.emailId);
      setUpdateEmailId(res.data.emailId);
    });
  };

  const updateEmployeeData = (id) => {
    // console.log(id);

    var obj = {
      firstName: updateFirstName,
      lastName: updateLastName,
      emailId: updateEmailId,
    };
    axios.patch(`http://localhost:5000/api/emp/${id}`, obj);
    window.location.reload(true);
  };

  const viewData = (e, id) => {
    e.preventDefault();
    // console.log(id);

    setOpen3(true);
    axios.get(`http://localhost:5000/api/emp/${id}`).then((res) => {
      setFirstName(res.data.firstName);
      setLastName(res.data.lastName);
      setEmailId(res.data.emailId);
    });
  };

  const DeleteData = (e, id) => {
    e.preventDefault();
    // console.log(id);

    axios.delete(`http://localhost:5000/api/emp/${id}`);
    window.location.reload(true);
  };

  return (
    <Paper
      sx={{
        maxWidth: 1200,
        overflow: "hidden",
        marginTop: 5,
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <TableContainer sx={{ maxHeight: 800, maxWidth: 1300 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) =>
                column.id === "empID" ? (
                  <></>
                ) : (
                  <TableCell
                    key={uuidv4()}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    <h3>{column.label}</h3>
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>

          {/* contents of the table are displayed here */}
          <TableBody>
            {empData?.map((row) => {
              return (
                <TableRow role="checkbox" tabIndex={-1} key={uuidv4()}>
                  {columns.map((column) => {
                    const value = row[column.id];

                    if (column.id === "action") {
                      return (
                        <TableCell>
                          <Button
                            sx={{
                              color: "white",
                              fontWeight: 600,

                              marginRight: 2,
                            }}
                            align={column.align}
                            variant="contained"
                            onClick={(e) => UpdateData(e, row.empID)}
                          >
                            Update
                          </Button>
                          {/* <Modal open={open1} onClose={handleClose1}>
                            
                          </Modal> */}

                          <Button
                            sx={{
                              fontWeight: 600,
                              marginRight: 2,
                            }}
                            variant="contained"
                            color="warning"
                            onClick={(e) => setOpen2(true)}
                          >
                            Delete
                          </Button>
                          <Modal open={open2} onClose={handleClose2}>
                            <Box
                              sx={style}
                              style={{
                                display: "flex",
                              }}
                            >
                              <Button
                                sx={{ marginLeft: "auto", marginRight: 2 }}
                                variant="contained"
                                color="warning"
                                onClick={(e) => DeleteData(e, row.empID)}
                              >
                                Yes
                              </Button>
                              <Button
                                variant="contained"
                                sx={{ marginRight: "auto" }}
                                onClick={(e) => window.location.reload(true)}
                              >
                                No
                              </Button>
                            </Box>
                          </Modal>

                          <Button
                            sx={{
                              fontWeight: 600,
                            }}
                            variant="contained"
                            onClick={(e) => viewData(e, row.empID)}
                          >
                            View
                          </Button>
                          <Modal open={open3} onClose={handleClose3}>
                            <Box sx={style}>
                              <FormControl
                                sx={{
                                  minWidth: 350,
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <TextField
                                  sx={{ marginBottom: 2 }}
                                  id="firstName"
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <AccountCircleIcon />
                                      </InputAdornment>
                                    ),
                                  }}
                                  size="normal"
                                  label="First Name"
                                  variant="outlined"
                                  value={firstName}
                                />
                                <TextField
                                  sx={{ marginBottom: 2 }}
                                  id="lastName"
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <AccountCircleIcon />
                                      </InputAdornment>
                                    ),
                                  }}
                                  size="normal"
                                  label="Last Name"
                                  variant="outlined"
                                  value={lastName}
                                />
                                <TextField
                                  sx={{ marginBottom: 2 }}
                                  id="email"
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <EmailIcon />
                                      </InputAdornment>
                                    ),
                                  }}
                                  size="normal"
                                  label="Email"
                                  variant="outlined"
                                  value={emailId}
                                />
                              </FormControl>
                            </Box>
                          </Modal>
                        </TableCell>
                      );
                    }

                    if (column.id === "empID") {
                      // setEmployeeData(value);
                      return;
                    }

                    //column other than button
                    return (
                      <TableCell key={column.id} align={column.align}>
                        <p style={{ fontSize: "1rem" }}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </p>
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Box style={{ marginBottom: "2rem", marginTop: "2rem" }} sx={style}>
        <FormControl
          sx={{
            minWidth: 350,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TextField
            sx={{ marginBottom: 2 }}
            id="firstName"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircleIcon />
                </InputAdornment>
              ),
            }}
            size="normal"
            label="First Name"
            variant="outlined"
            value={updateFirstName}
            onChange={(e) => setUpdateFirstName(e.target.value)}
          />
          <TextField
            sx={{ marginBottom: 2 }}
            id="lastName"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircleIcon />
                </InputAdornment>
              ),
            }}
            size="normal"
            label="Last Name"
            variant="outlined"
            value={updateLastName}
            onChange={(e) => setUpdateLastName(e.target.value)}
          />
          <TextField
            sx={{ marginBottom: 2 }}
            id="email"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
            size="normal"
            label="Email"
            variant="outlined"
            value={updateEmailId}
            onChange={(e) => setUpdateEmailId(e.target.value)}
          />

          <Button
            sx={{
              minWidth: 150,
              minHeight: 50,
              marginTop: 2,
              fontWeight: 600,
            }}
            variant="contained"
            type="submit"
            onClick={(e) => updateEmployeeData(emppID)}
          >
            Update Employee
          </Button>
        </FormControl>
      </Box>
    </Paper>
  );
};

export default Tablee;
