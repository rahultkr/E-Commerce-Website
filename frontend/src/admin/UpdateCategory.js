import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { getCategory, updateCategory } from "./helper/adminapicall";

const UpdateCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const { categoryId } = useParams();

  const { user, token } = isAuthenticated();

  const goBack = () => {
    return (
      <div className="mt-5">
        <Link
          className="btn btn-sm btn-outline-danger mb-3 rounded-3 px-3"
          to="/admin/dashboard"
        >
          Back
        </Link>
      </div>
    );
  };

  const handleChange = (event) => {
    setError("");
    setName(event.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    //backend request
      updateCategory(categoryId, user._id, token, { name })
          .then(data => {
              if (data.error) {
                  setError(data.error);
                  console.log(data.error);
              }
              else {
                  setSuccess(true);
                  setName('');
                  setTimeout(() => {
                      setSuccess(false);
                  }, 3000);
              }
      })
  };
    
    const preloadCategory = (categoryId) => {
        getCategory(categoryId)
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                }
                else {
                    setName(data.name);
                }
        })
    };

    useEffect(() => {
        preloadCategory(categoryId);
    }, []);

  const successMessage = () => {
    if (success) {
      return (
        <h4 className="text-success text-center">
          Category updated successfully
        </h4>
      );
    }
  };

  const warningMessage = () => {
    if (error) {
      return (
        <h4 className="text-danger text-center">Failed to update category</h4>
      );
    }
  };

  const categoryForm = () => {
    return (
      <div>
        <form>
          <div className="form-group">
            <p className="lead">Enter the category</p>
            <input
              type="text"
              autoFocus
              required
              value={name}
              onChange={handleChange}
              placeholder="For Ex. Summer"
              className="form-control my-3"
            />
            <button className="btn btn-outline-success " onClick={onSubmit}>
              Update Category
            </button>
          </div>
        </form>
      </div>
    );
  };

  return (
    <Base
      title="Create a category here"
      description="Add a new category for products"
      className="container bg-dark p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2 p-4">
          {successMessage()}
          {warningMessage()}
          {categoryForm()}
          {goBack()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateCategory;
