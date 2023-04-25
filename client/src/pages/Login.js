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
export default function Home() {
  const [email,setemail]=useState("");
  const [Passward,setPassward]=useState("");
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
      <div className='homeClass text-center' style={{ minHeight: '150vh', backgroundColor: '#FFF9DE'}}>
        <div className='homeText dangle'>
          
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
              label='Passward'
              variant='outlined'
              value={Passward}
              onChange={(event) => {
                setPassward(event.target.value);
              }}
              style={{ marginBottom: '10px', width: '100%' }}
            />
            <Button
              variant='contained'
              style={{ backgroundColor: "#F7D060",color: "black", width: "100%" }}
              onClick={handleContinueClick}
            >
              <Typography variant="button" style={{ fontFamily: "Calibri" }}>
              Login
              </Typography>
            </Button>
            <Button
              variant='contained'
              color='primary'
              style={{  backgroundColor: "#F7D060",color: "black", width: "100%",marginTop: '10px' }}
              onClick={handleContinueClick}
            >
              <Typography variant="button" style={{ fontFamily: "Calibri" }}>
              Login with google
              </Typography>
            </Button>
          </Paper>
        </div>
      </div>
    </>
  );
}

