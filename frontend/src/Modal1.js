import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  FormControl,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";
import axios from "axios";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";

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

const Modal1 = (props) => {
  const [open, setOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:5000/api/emp/${props.id}`).then((res) => {
      const dataa = res.data;

      setFirstName(dataa.firstName);
      setLastName(dataa.lastName);
      setEmailId(dataa.emailId);
    });
  }, [props.id]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const validateForm = () => {
    // return firstName.length > 0 && lastName.length > 0 && emailId.length > 0;
  };

  const onSubmitHandler = () => {
    var empObj = {
      firstName: firstName,
      lastName: lastName,
      emailId: emailId,
    };

    axios.patch("http://localhost:5000/api/emp/", empObj);
  };

  return (
    <Modal open={props.open} onClose={handleClose}>
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
            }}
            variant="outlined"
            type="submit"
            disabled={!validateForm()}
            onClick={onSubmitHandler}
          >
            Add Employee
          </Button>
        </FormControl>
      </Box>
    </Modal>
  );
};

export default Modal1;
