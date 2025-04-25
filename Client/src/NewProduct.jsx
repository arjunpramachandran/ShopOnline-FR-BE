import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewProdect = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    discription: "",
    imageUrl: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token"); // Assuming token is stored in localStorage

      const response = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include token in header
        },
        body: JSON.stringify(product),
      });

      const data = await response.json();

      if (response.status === 201) {
        setMessage("Product created successfully!");
        alert("Product created successfully!");
        setProduct({ name: "", price: "", discription: "", imageUrl: "" });
        navigate('/')

      } else {
        setMessage(data.error || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Server error.");
    }
  };

  return (
    <div className="container justify-content-center  m-5">
      <div className="card col-6">
        <h3 className="card-title text-center m-3" style={{fontFamily:'monospace'}}>Sell Your Product</h3>
        {message && <div className="alert alert-info">{message}</div>}
        <form className="card-body" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Product Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={product.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Price</label>
            <input
              type="number"
              className="form-control"
              name="price"
              value={product.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              name="discription"
              value={product.discription}
              onChange={handleChange}
              rows="3"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Image URL</label>
            <input
              type="text"
              className="form-control"
              name="imageUrl"
              value={product.imageUrl}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewProdect;
