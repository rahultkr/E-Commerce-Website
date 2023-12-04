import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Base from "../core/Base";
import { getCategories, createProduct } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";

const AddProduct = () => {
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    createdProduct: "",
    getRedirect: false,
    formData: "",
  });

  const {
    name,
    description,
    price,
    stock,
    photo,
    categories,
    category,
    loading,
    error,
    createdProduct,
    getRedirect,
    formData,
  } = values;

  const preload = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, categories: data, formData: new FormData() });
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: "", loading: true });
    console.log(values.stock);
    createProduct(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          price: "",
          photo: "",
          stock: "",
          loading: false,
          createdProduct: data.name,
        });
        setTimeout(() => {
          setValues({ createdProduct: '' });
        },2000)
      }
    });
  };

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

    const successMessage = () => {
      return (
        <div
          className="alert alert-success mt-3"
          style={{ display: createdProduct ? "" : 'none' }}
        >
          <h4>{createdProduct} created successfully</h4>
        </div>
      );
    };
  
  const warningMessage = () => {
    return (
      <div
        className="alert alert-danger mt-3"
        style={{ display: error ? "" : "none" }}
      >
        <h4>{error}</h4>
      </div>
    );
  };
  
  const createProductForm = () => (
    <form>
      <span>Post photo</span>
      <div className="form-group">
        <label className="btn btn-block btn-success mt-3">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group  mt-3">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group  mt-3">
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group  mt-3">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group  mt-3">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
        >
          <option>Select</option>
          {categories &&
            categories.map((ctgry, index) => {
              return (
                <option key={index} value={ctgry._id}>
                  {ctgry.name}
                </option>
              );
            })}
        </select>
      </div>
      <div className="form-group  mt-3">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control"
          placeholder="Stock"
          value={stock}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success mt-3 mb-3"
      >
        Create Product
      </button>
    </form>
  );


  return (
    <Base
      title="Add product here!"
      description="Welcome to product creation section"
      className="container bg-dark p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2 ">
          {successMessage()}
          {warningMessage()}
          {createProductForm()}
          <div className="mt-5">
            <Link
              className="btn btn-sm btn-outline-danger mb-3 px-3 rounded-3"
              to="/admin/dashboard"
            >
              Back
            </Link>
          </div>
        </div>
      </div>
    </Base>
  );
};

export default AddProduct;
