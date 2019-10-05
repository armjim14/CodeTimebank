import React, { useContext, Fragment, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import AuthContext from "../Context/auth/authContext";
import AlertContext from "../Context/alert/alertContext";

function Login(props) {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;
  const { login, error, clearErrors, isAuthenticated } = authContext;

  const [user, setUser] = useState({
    username: "",
    password: ""
  });

  const { username, password } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (username === "" || password === "") {
      setAlert("Please fill in all fields", "danger");
    } else {
      login({ username, password });
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/dashboard");
    }
    if (error === "Invalid credentials") {
      setAlert(error, "danger");
      clearErrors();
    }
  }, [error, isAuthenticated, props.history]);
  return (
    <Fragment>
      <div className='row'>
        <h1 className='col-md-12 text-center'>Login</h1>
      </div>
      <div className='form-group row'>
        <label htmlFor='username' className='col-md-2 col-form-label'>
          Username
        </label>
        <div className='col-md-10'>
          <input
            type='text'
            name='username'
            className='form-control'
            placeholder='Enter your username'
            value={username}
            onChange={onChange}
          />
        </div>
      </div>
      <div className='form-group row'>
        <label htmlFor='password' className='col-md-2 col-form-label'>
          Password
        </label>
        <div className='col-md-10'>
          <input
            type='password'
            name='password'
            className='form-control'
            placeholder='Enter your password'
            value={password}
            onChange={onChange}
          />
        </div>
      </div>
      <button className='btn btn-block btn-greyish' onClick={onSubmit}>
        Submit
      </button>
      <div className='row mt-3 mt-3'>
        <div className='col-md-12'>
          <h5 className='text-center'>
            <a href='/register' rel='noopener noreferrer'>
              Not registered yet? Click here to register.
            </a>
          </h5>
        </div>
      </div>
    </Fragment>
  );
}

export default withRouter(Login);
