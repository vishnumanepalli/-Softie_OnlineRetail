import React from 'react'
import  { useState } from "react";
import { Button, IconButton,
  Typography,
  TextField,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions, } from "@mui/material";
import { FaGoogle } from "react-icons/fa";
export default function Home() {
  const [email,setemail]=useState("");
  const [Password,setPassword]=useState("");
  const [otpDialogOpen, setOtpDialogOpen] = useState(false);
  const [otp, setOtp] = useState("");

  const handleContinueClick = async () => {
    setemail("")
  };

  const handleCloseDialog = () => {
    setOtp("")
    setOtpDialogOpen(false);
  };

  const handleverify = async () => {
    setOtp("")
    
  };
  
  const handleOtpChange = (event) => {
  };

 
  return (
    <>
      <div className='homeClass text-center' style={{ minHeight: '150vh'}}>
        <div className='homeText dangle' style={{ borderColor:"ABD5AB" }}>
          
          <br />
          <Paper elevation={3} style={{ padding: '24px', maxWidth: '500px', maxHeight: 'auto', margin: '0 auto',marginTop: '70px' }}>
            <TextField
              id='outlined-basic'
              label='Login with Email'
              variant='outlined'
              value={email}
              onChange={(event) => {
                setemail(event.target.value);
              }}
              style={{ marginBottom: '10px', width: '100%' }}
            />
            <TextField
              id='outlined-basic'
              label='Password'
              variant='outlined'
              value={Password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              style={{ marginBottom: '10px', width: '100%' }}
            />
            <Button
              variant='contained'
              style={{ backgroundColor: "#00AD83",color: "black", width: "100%" }}
              onClick={handleContinueClick}
            >
              <Typography variant="button" style={{ fontFamily: "Calibri" }}>
              Login
              </Typography>
            </Button>
            <Button
            variant="contained"
            style={{ backgroundColor: "#00AD83",color: "black", width: "100%",marginTop: '10px', height:'35px'}}
            onClick={handleContinueClick}
          >
            <IconButton
              color="inherit"
            >
              <FaGoogle /> {/* Add Google icon */}
            </IconButton>
            <Typography variant="button" style={{ marginLeft: "8px",fontFamily: "Calibri"  }}>
                Login with Google
              </Typography>
          </Button>
          </Paper>
        </div>
      </div>
    </>
  );
}

