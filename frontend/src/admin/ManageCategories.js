import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { deleteCategory, getCategories } from "./helper/adminapicall";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);

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

  const delCategory = (categoryId) => {
    deleteCategory(categoryId, user._id, token)
    .then(data => {
      if (data.error) {
        console.log(data.error);
      }
      else {
        preloadCategories();
      }
    })
  }

  const preloadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  useEffect(() => {
    preloadCategories();
  }, []);

  return (
    <Base title="Welcome admin" description="Manage Categories here">
      <h1 className="mb-4">All Categories:</h1>
      {goBack()}
      <div className="row">
        <div className="col-12">
          {categories.map((category,index) => {
            return (
              <div key={index} className="row text-center mb-2 ">
                <div className="col-4">
                  <h3 className="text-white text-left">{category.name}</h3>
                </div>
                <div className="col-4">
                  <Link
                    className="btn btn-success"
                    to={`/admin/category/update/${category._id}`}
                  >
                    <span className="">Update</span>
                  </Link>
                </div>
                <div className="col-4">
                  <button
                    onClick={() => delCategory(category._id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
};

export default ManageCategories;
