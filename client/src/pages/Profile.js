import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

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
    seteAddress({
      ...eaddress,
      [e.target.name]: e.target.value,
    });
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
      <h1 style={{ marginTop: "90px" }}>Profile</h1>
      {editMode ? (
        <div>
        <p>Full Name: {address.fullName ?? "N/A"}</p>
        <p>Email: {address.email ?? "N/A"}</p>
        <p>Username: {address.username ?? "N/A"}</p>
        <p>Address: {address.address ?? "N/A"}</p>
        <p>City: {address.city ?? "N/A"}</p>
        <p>State: {address.state ?? "N/A"}</p>
        <p>Country: {address.country ?? "N/A"}</p>
        
          <h2>Edit fields</h2>
          <form>
            <label>
              Username:
              <input
                type="text"
                name="username"
                value={eaddress.username}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Address:
              <input
                type="text"
                name="address"
                value={eaddress.address}
                onChange={handleInputChange}
              />
            </label>
            <label>
              City:
              <input
                type="text"
                name="city"
                value={eaddress.city}
                onChange={handleInputChange}
              />
            </label>
            <label>
              State:
              <input
                type="text"
                name="state"
                value={eaddress.state}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Country:
              <input
                type="text"
                name="country"
                value={eaddress.country}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                name="country"
                value={password}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Confirm Password:
              <input
                type="password"
                name="country"
                value={cpassword}
                onChange={handleInputChange}
              />
            </label>
             <button type="button" onClick={handleSaveClick}>
              Save
            </button>
          </form>
        </div>
      ) : (
        <div>
          <p>Full Name: {address.fullName ?? "N/A"}</p>
          <p>Email: {address.email ?? "N/A"}</p>
          <p>Username: {address.username ?? "N/A"}</p>
          <p>Address: {address.address ?? "N/A"}</p>
          <p>City: {address.city ?? "N/A"}</p>
          <p>State: {address.state ?? "N/A"}</p>
          <p>Country: {address.country ?? "N/A"}</p>
          <button type="button" onClick={handleEditClick}>
            Edit
          </button>
        </div>
      )}
    </div>
  );
}

export default Profile;
