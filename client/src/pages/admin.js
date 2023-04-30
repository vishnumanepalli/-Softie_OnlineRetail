import React, { useState } from "react";
import axios from "axios";
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import '../css/admin.css';

const AddProduct = () => {
  const [product, setProduct] = useState({
    product_id: "",
    name: "",
    image_url: "",
    price: "",
    description: "",
    quantity: 0,
  });

  const handleInputChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/add_product", product)
      .then((res) => {
        console.log(res.data);
        alert("Product added successfully!");
        setProduct({
          product_id: "",
          name: "",
          image_url: "",
          price: "",
          quantity: 0,
          description: ""
        });
      })
      .catch((error) => {
        console.log(error);
        alert("Error adding product. Please try again.");
      });
  };

  return (
    <div>
        <br/>
      <Paper  style={{marginTop: '140px', padding: '20px', width: '50%', margin: '0 auto', display: 'flex', justifyContent: 'center' }} elevation={3}>
        <form onSubmit={handleSubmit}>
            <TextField
            label="Product ID"
            name="product_id"
            value={product.product_id}
            onChange={handleInputChange}
            />
            <br />
            <TextField
            label="Product Name"
            name="name"
            value={product.name}
            onChange={handleInputChange}
            />
            <br />
            <TextField
            label="Image URL"
            name="image_url"
            value={product.image_url}
            onChange={handleInputChange}
            />
            <br />
            <TextField
            label="Price"
            name="price"
            value={product.price}
            onChange={handleInputChange}
            />
            <br />
            <TextField
            label="quantity"
            name="quantity"
            type="number"
            value={product.quantity}
            onChange={handleInputChange}
            />
            <br />
            <TextField
            label="Description"
            name="description"
            value={product.description}
            onChange={handleInputChange}
            />
            <br />
            <button type="submit" style={{marginTop:'20px'}}>Add Product</button>
        </form>
        </Paper>
    </div>
  );
};

export default AddProduct;
