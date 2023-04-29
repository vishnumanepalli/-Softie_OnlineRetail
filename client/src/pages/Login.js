import React from 'react';
import { useState, useEffect } from 'react';
import {
  Button,
  IconButton,
  Typography,
  TextField,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { FaGoogle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { gapi } from 'gapi-script';
import { GoogleLogin } from 'react-google-login';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [fullname, setFullname] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [openSignupDialog, setOpenSignupDialog] = useState(false);
  const [loggedInUsername, setLoggedInUsername] = useState('');

  const handleOpenSignupDialog = () => {
    setOpenSignupDialog(true);
  };

  const handleCloseSignupDialog = () => {
    setOpenSignupDialog(false);
  };

  const handleSignup = async () => {
    if (!email || !password || !username || !fullname || !confirmPassword) {
      alert('Please fill in all the required fields.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          username: username,
          fullname: fullname,
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleContinueClick = async () => {
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const data = await response.json();
      console.log(data);
      console.log(response.ok);
      if (response.ok) {
        console.log("hi");
        setLoggedInUsername(data.user.username);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogoutClick = () => {
    setLoggedInUsername('');
  };
  const handleGoogleLogin = async (response) => {
    console.log(response);

    try {
      // Send the access token to your server to authenticate the user
      const res = await fetch('http://localhost:5000/googleLogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: response.tokenId }),
      });
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        setLoggedInUsername(data.user.username);
      }
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

  useEffect(() => {
    gapi.load('auth2', function () {
      gapi.auth2.init({
        clientId: '84294184491-o1l9lief27ng4qak7b5hb0rd180ptr9k.apps.googleusercontent.com',
      });
    });
  }, []);

  return (
    <>
     {loggedInUsername ? (
        <div className='homeClass text-center' style={{ minHeight: '150vh' }}>
          <div className='homeText dangle' style={{ borderColor:"ABD5AB" }}>
             <br />
           <Paper elevation={3} style={{ padding: '24px', maxWidth: '500px', maxHeight: 'auto', margin: '0 auto',marginTop: '70px' }}>
          <Typography variant='button' style={{ fontFamily: 'Calibri' }}>
            Hi {loggedInUsername}!
          </Typography>
          <Button
            variant='contained'
            style={{ backgroundColor: '#00AD83', color: 'black', width: '100%', marginTop: '10px', height: '35px' }}
            onClick={handleLogoutClick}
          >
            <Typography variant='button' style={{ marginLeft: '8px', fontFamily: 'Calibri' }}>
              Logout
            </Typography>
          </Button>
          </Paper>
        </div>
     </div>
      ) : (
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
          setEmail(event.target.value);
        }}
        style={{ marginBottom: '10px', width: '100%' }}
      />
      <TextField
        id='outlined-basic'
        label='Password'
        variant='outlined'
        value={password}
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

      {loggedInUsername && (
        <Typography variant="button" style={{ fontFamily: "Calibri" }}>
          Hi {loggedInUsername}!
        </Typography>
      )}
            <Button
              variant="contained"
              style={{ backgroundColor: "#00AD83",color: "black", width: "100%",marginTop: '10px', height:'35px'}}
              onClick={handleOpenSignupDialog}
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
  
        <Dialog open={openSignupDialog} onClose={handleCloseSignupDialog}>
          <DialogTitle>Signup</DialogTitle>
          <DialogContent>
            <TextField
              id='outlined-basic'
              label='Email'
              variant='outlined'
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              style={{ marginBottom: '10px', width: '100%' }}
            />
            <TextField
              id='outlined-basic'
              label='Username'
              variant='outlined'
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
              }}
              style={{ marginBottom: '10px', width: '100%' }}
            />
            <TextField
              id='outlined-basic'
              label='Full Name'
              variant='outlined'
              value={fullname}
              onChange={(event) => {
                setFullname(event.target.value);
              }}
              style={{ marginBottom: '10px', width: '100%' }}
            />
            <TextField
              id='outlined-basic'
              label='Password'
              variant='outlined'
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              style={{ marginBottom: '10px', width: '100%' }}
              />
               <TextField
              id='outlined-basic'
              label='Confirm password'
              variant='outlined'
              value={confirmPassword}
              onChange={(event) => {
                setConfirmPassword(event.target.value);
              }}
              style={{ marginBottom: '10px', width: '100%' }}
            />
              </DialogContent>
              <DialogActions>
              <Button onClick={handleCloseSignupDialog} color='primary'>
              Cancel
              </Button>
              <Button onClick={handleSignup} color='primary'>
              Signup
              </Button>
              </DialogActions>
              </Dialog>
              </div>
      )}
              </>
     
              );}
  