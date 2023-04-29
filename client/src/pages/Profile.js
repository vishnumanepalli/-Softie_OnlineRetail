import React, { useState, useEffect } from "react";
import axios from "axios";

function Profile() {
  const [user, setUser] = useState({});
  const [address, setAddress] = useState({
    fullname: "",
    email:"",
    username:"",
    address: "",
    city: "",
    state: "",
    country: "",
  });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    async function getUser() {
      try {
        const response = await axios.get("/api/users/me");
        setUser(response.data.user);
        setAddress(response.data.user.address);
      } catch (error) {
        console.error(error);
      }
    }

    getUser();
  }, []);

  const handleInputChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = async () => {
    try {
      const response = await axios.patch("/api/users/me", { address });
      setUser(response.data.user);
      setAddress(response.data.user.address);
      setEditMode(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <br/>
      <h1 style={{marginTop:'90px'}}>Profile</h1>
      {/* <p>Full Name: {user.fullName}</p>
      <p>Email: {user.email}</p>
      <p>Username: {user.username}</p> */}

      {editMode ? (
        <div>
          <h2>Edit fields</h2>
          <form>
          <label>
              Full Name:
              <input
                type="text"
                name="address"
                value={address.address}
                onChange={handleInputChange}
              />
            </label>
          <label>
              Email:
              <input
                type="text"
                name="address"
                value={address.address}
                onChange={handleInputChange}
              />
            </label>
          <label>
              Username:
              <input
                type="text"
                name="address"
                value={address.address}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Address:
              <input
                type="text"
                name="address"
                value={address.address}
                onChange={handleInputChange}
              />
            </label>
            <label>
              City:
              <input
                type="text"
                name="city"
                value={address.city}
                onChange={handleInputChange}
              />
            </label>
            <label>
              State:
              <input
                type="text"
                name="state"
                value={address.state}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Country:
              <input
                type="text"
                name="country"
                value={address.country}
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
          <p>Full Name: {address.address}</p>
          <p>Email: {address.address}</p>
          <p>Username: {address.address}</p>
          <p>Address: {address.address}</p>
          <p>City: {address.city}</p>
          <p>State: {address.state}</p>
          <p>Country: {address.country}</p>
          <button type="button" onClick={handleEditClick}>
            Edit
          </button>
        </div>
      )}
    </div>
  );
}

export default Profile;
