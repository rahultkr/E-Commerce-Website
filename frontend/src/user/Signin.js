import React from 'react'
import { useState } from 'react';
import { useNavigate,Navigate } from "react-router-dom"
import { authenticate, isAuthenticated, signin } from '../auth/helper';

import Base from '../core/Base';

const Signin = () => {

  const navigate = useNavigate();

    const [values, setValues] = useState({
      email: "",
      password: "",
      error: "",
      loading: false,
      didRedirect: false
    });

    const { email, password, error,loading, didRedirect } = values;
    const { user } = isAuthenticated();

    const handleChange = (prop) => (event) => {
      setValues({ ...values, error: false, [prop]: event.target.value });
    };

    const onSubmit = (e) => {
      e.preventDefault();
      setValues({ ...values, error: false,loading:true });
      signin({ email, password }).then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true
            })
          })
        }
      })
        .catch(err => {
        console.log('Signin request failed');
      });
  };  
  
  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Navigate to='/admin/dashboard' />;
      }
      else {
        return <Navigate to='/user/dashboard'/>
      }
    }
 }

   const loadingMessage = () => {
     return (
      //  <div className="row">
      //    <div className="col-md-6 offset-sm-3 text-left">
      //      <div
      //        className="alert alert-info"
      //        style={{ display: loading ? "" : "none" }}
      //      >
      //        New account was created successfully.Please{" "}
      //        <Link to="/signin">Login Here</Link>
      //      </div>
      //    </div>
      //  </div>
       loading && (
         <div className="alert alert-info">
           <h2>
             loading...
           </h2>
         </div>
       )
     );
   };

   const errorMessage = () => {
     return (
       <div className="row">
         <div className="col-md-6 offset-sm-3 text-left">
           <div
             className="alert alert-danger"
             style={{ display: error ? "" : "none" }}
           >
             {error}
           </div>
         </div>
       </div>
     );
   };


   const signInForm = () => {
     return (
       <div className="row">
         <div className="col-md-6 offset-sm-3 text-left">
           <form action="">
             <div className="form-group ">
               <label className="text-light">Email</label>
               <input className="form-control" value={email} onChange={handleChange('email')} type="email" />
             </div>
             <div className="form-group mt-3">
               <label className="text-light">Password</label>
               <input className="form-control" value={password} onChange={handleChange('password')} type="password" />
             </div>
             <button className="btn btn-success btn-block mt-4" onClick={onSubmit}>Submit</button>
           </form>
         </div>
       </div>
     );
   };
 
  return (
    <Base title="Sign in page" description="A page for user to signIn">
      <div>
        {loadingMessage()}
        {errorMessage()}
        {signInForm()}
        {performRedirect()}
      </div>
    </Base>
  );
}

export default Signin