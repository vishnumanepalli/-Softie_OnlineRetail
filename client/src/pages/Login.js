import React from 'react'
import axios from 'axios';
import  { useState } from "react";
import  { useEffect } from "react";
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
  const [Passward,setPassward]=useState("");
  const [otpDialogOpen, setOtpDialogOpen] = useState(false);
  const [otp, setOtp] = useState("");

  const handleContinueClick = async () => {
    setemail("")
  };

      // if (data.user) {
      //   setLoggedIn(true);
      //   setUser(data.user);
      // }
    } catch (error) {
      console.log(error);
    }
  };

  const onSuccess = async (response) => {
    handleGoogleLogin(response);
  };

  const onFailure = (response) => {
    console.log(response);
  };
  
  // const handleGoogleLogin = async () => {
  //   try {
  //     // Call the Google Login API endpoint
  //     const response = await fetch('http://localhost:5000/googleLogin', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({
  //         access_token: 'ACCESS_TOKEN_HERE'
  //       })
  //     });
  //     const data = await response.json();
  //     console.log(data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  
  useEffect(() => {
    gapi.load('auth2', function() {
      gapi.auth2.init({
        clientId: '84294184491-o1l9lief27ng4qak7b5hb0rd180ptr9k.apps.googleusercontent.com'
      });
    });
  }, []);
  
    
  return (
    <>
      <div className='homeClass text-center' style={{ minHeight: '150vh'}}>
        <div className='homeText dangle' style={{ borderColor:"#ABD5AB" }}>
          
          <br />
          <Paper elevation={3} style={{ padding: '24px', maxWidth: '500px', maxHeight: 'auto', margin: '0 auto',marginTop: '150px' }}>
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
              component={Link}
              to='/signup'
            >
              <Typography variant="button" style={{ marginLeft: "8px",fontFamily: "Calibri"  }}>
                Signup
              </Typography>
            </Button>
            <GoogleLogin
   //clientId="84294184491-o1l9lief27ng4qak7b5hb0rd180ptr9k.apps.googleusercontent.com"
   buttonText="Login with Google"
   plugin_name="grocery_store"
   onSuccess={onSuccess}
   onFailure={onFailure}
   cookiePolicy={'single_host_origin'}
   style={{ backgroundColor: "#00AD83", color: "black", width: "100%", marginTop: '10px', height: '35px', fontFamily: "Calibri" }}
   isSignedIn={true}

 />

          </Paper>
        </div>
      </div>
    </>
  );
}
