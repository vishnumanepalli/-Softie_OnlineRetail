import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import '../css/profile.css';
import TextField from '@material-ui/core/TextField';

const Profile = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [user, setUser] = useState({});
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [address, setAddress] = useState({
    fullName: "",
    email: "",
    username: "",
    address: "",
    city: "",
    state: "",
    country: "",
  });
  const [eaddress, seteAddress] = useState({
    fullName: "",
    email: "",
    username: "",
    address: "",
    city: "",
    state: "",
    country: "",
  });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    // Fetch the user data from the server
    axios
      .post("http://localhost:5000/get_s_user", { user_id: cookies.userId })
      .then((res) => {
        setUser(res.data[0]);
        setAddress({
          fullName: res.data[0].fullname,
          email: res.data[0].email,
          username: res.data[0].username,
          address: res.data[0].address,
          city: res.data[0].city,
          state: res.data[0].state,
          country: res.data[0].country,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleInputChange = (e) => {
    if (e.target.name === "password") {
      setPassword(e.target.value);
    } else if (e.target.name === "cpassword") {
      setCpassword(e.target.value);
    } else {
      seteAddress({
        ...eaddress,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleEditClick = () => {
    seteAddress(address);
    setEditMode(true);
  };
  
  const handleSaveClick = () => {
    // Validate password
    if (password !== cpassword) {
      alert("Passwords do not match");
      return;
    }
  
    // Prepare the updated user object
    const updatedUser = {
      user_id: cookies.userId,
      username: eaddress.username,
      address: eaddress.address,
      city: eaddress.city,
      state: eaddress.state,
      country: eaddress.country,
      password: password,
    };
  
    // Send the updated user data to the server
    axios
      .post("http://localhost:5000/update_user", updatedUser)
      .then((res) => {
        // Update the user state with the new data
        setUser(res.data[0]);
        setAddress({
          fullName: res.data[0].fullname,
          email: res.data[0].email,
          username: res.data[0].username,
          address: res.data[0].address,
          city: res.data[0].city,
          state: res.data[0].state,
          country: res.data[0].country,
        });
  
        // Exit edit mode
        setEditMode(false);
  
        // Show alert message
        alert("Updated Successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  

  return (
    <div>
      <br />
      {editMode ? (
       <div style={{ marginTop:'80px'}}>
        <div className="edit-box">
            Edit Feilds
        </div>
       <div >
         <form>
           <TextField
             label="Username"
             name="Username"
             value={eaddress.username}
             onChange={handleInputChange}
           />
           <br />
           <TextField
             label="address"
             name="address"
             value={eaddress.address}
             onChange={handleInputChange}
           />
           <br />
           <TextField
             label="City"
             name="city"
             value={eaddress.city}
             onChange={handleInputChange}
           />
           <br />
           <TextField
             label="State"
             name="state"
             value={eaddress.state}
             onChange={handleInputChange}
           />
           <br />
           <TextField
             label="Country"
             name="country"
             value={eaddress.country}
             onChange={handleInputChange}
           />
           <br />
           <TextField
             label="Password"
             type="password"
             name="password"
             value={password}
             onChange={handleInputChange}
           />
           <br />
           <TextField
             label="Confirm Password"
             type="password"
             name="cpassword"
             value={cpassword}
             onChange={handleInputChange}
           />
           <br />
           <button className="button" type="button" onClick={handleSaveClick} >
             Save
           </button>
         </form>
       </div>
     </div>     
      ) : (
        <div>
          <h1 style={{ marginTop: "90px" }}>Profile</h1>
          <div class="address-box">
          <table class="address-table">
          
          <tbody>
            <tr>
              <td>Full Name</td>
              <td>{address.fullName ?? "N/A"}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{address.email ?? "N/A"}</td>
            </tr>
            <tr>
              <td>Username</td>
              <td>{address.username ?? "N/A"}</td>
            </tr>
            <tr>
              <td>Address</td>
              <td>{address.address ?? "N/A"}</td>
            </tr>
            <tr>
              <td>City</td>
              <td>{address.city ?? "N/A"}</td>
            </tr>
            <tr>
              <td>State</td>
              <td>{address.state ?? "N/A"}</td>
            </tr>
            <tr>
              <td>Country</td>
              <td>{address.country ?? "N/A"}</td>
            </tr>
          </tbody>
          </table>

          </div>
          <button className="button" type="button" onClick={handleEditClick}>
            Edit
          </button>
        </div>
      )}
    </div>
  );
}

export default Profile;
