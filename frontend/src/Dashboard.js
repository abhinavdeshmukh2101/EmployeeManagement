import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Modal,
  Box,
  FormControl,
  TextField,
  InputAdornment,
  Paper,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import { v4 as uuidv4 } from "uuid";

import "./App.css";
import Tablee from "./Tablee";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#ffffff",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [addModal, setAddModal] = useState(false);

  const onSubmitHandler = (e) => {
    // e.preventDefault();
    const empid = uuidv4();

    var empObj = {
      firstName: firstName,
      lastName: lastName,
      emailId: emailId,
      id: empid,
    };

    axios.post("http://localhost:5000/api/emp/", empObj);
    window.location.reload(true);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const validateForm = () => {
    return firstName.length > 0 && lastName.length > 0 && emailId.length > 0;
  };

  return (
    <div className="App">
      <h1>Employee List</h1>
      <Button variant="contained" onClick={handleOpen}>
        Add Employee
      </Button>
      <Modal open={open} onClose={handleClose}>
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
              onChange={(e) => setFirstName(e.target.value)}
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
              onChange={(e) => setLastName(e.target.value)}
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
              onChange={(e) => setEmailId(e.target.value)}
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
              disabled={!validateForm()}
              onClick={onSubmitHandler}
            >
              Add Employee
            </Button>
          </FormControl>
        </Box>
      </Modal>
      <Tablee />
    </div>
  );
};

export default Dashboard;
