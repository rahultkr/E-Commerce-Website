import React from "react";
import { Link } from "react-router-dom";

import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";

const AdminDashBoard = () => {
  const {
    user: { name, email, role },
  } = isAuthenticated();

  const adminLeftSide = () => {
    return (
      <div className="card">
        <h4 className="card-header bg-dark text-white">Admin Navigation</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/admin/create/category" className="nav-link text-success">
              Create Category
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/categories" className="nav-link text-success">
              Manage Categories
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/create/product" className="nav-link text-success">
              Create Product
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/products" className="nav-link text-success">
              Manage Products
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/orders" className="nav-link text-success">
              Manage Orders
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const adminRightSide = () => {
    return (
      <div className="card mb-4">
        <h4 className="card-header">Admin Information</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <span className="badge badge-success text-success mr-2">Name:</span>{" "}
            {name}
          </li>
          <li className="list-group-item">
            <span className="badge text-success mr-2">email:</span> {email}
          </li>
          <li className="list-group-item">
            <span className="badge text-danger">Admin area
            </span>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <React.Fragment>
      <Base
        title="Welcome to AdminDashboard"
        description="Manage all of your products here"
        className="container bg-success p-4"
      >
        <div className="row">
          <div className="col-3">{adminLeftSide()}</div>
          <div className="col-9">{adminRightSide()}</div>
        </div>
      </Base>
    </React.Fragment>
  );
};

export default AdminDashBoard;
