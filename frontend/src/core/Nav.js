import React, { Fragment } from 'react'
import {Link,useLocation,useNavigate} from 'react-router-dom'

import { isAuthenticated,signout } from '../auth/helper';

const currentTab = (path) => {
    const location = useLocation();
    if (location.pathname === path) {
        return {color:'#2ecc72'}
    } 
    else {
        return {color: '#FFFFFF'}
    }
}

const Nav = () => {
  
  const navigate = useNavigate();
  return (
    <div>
      <ul className="nav nav-tabs bg-dark">
        <li className="nav-item">
          <Link style={currentTab("/")} className="nav-link" to={"/"}>
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link style={currentTab("/cart")} className="nav-link" to={"/cart"}>
            Cart
          </Link>
        </li>
        {isAuthenticated() && isAuthenticated().user.role === 0 && (
          <li className="nav-item">
            <Link
              style={currentTab("/user/dashboard")}
              className="nav-link"
              to={"/user/dashboard"}
            >
              Dashboard
            </Link>
          </li>
        )}
        {isAuthenticated() && isAuthenticated().user.role === 1 && (
          <li className="nav-item">
            <Link
              style={currentTab("/admin/dashboard")}
              className="nav-link"
              to={"/admin/dashboard"}
            >
              Admin Dashboard
            </Link>
          </li>
        )}
        {!isAuthenticated() && (
          <Fragment>
            <li className="nav-item">
              <Link
                style={currentTab("/signup")}
                className="nav-link"
                to={"/signup"}
              >
                Signup
              </Link>
            </li>
            <li className="nav-item">
              <Link
                style={currentTab("/signin")}
                className="nav-link"
                to={"/signin"}
              >
                SignIn
              </Link>
            </li>
          </Fragment>
        )}
        {isAuthenticated() && (
          <li className="nav-item">
            <span
              className="nav-link text-warning"
              onClick={() => {
                signout(() => {
                  navigate("/");
                });
              }}
            >
              Signout
            </span>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Nav;