import React, { useContext, Fragment, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import AuthContext from "../Context/auth/authContext";
import { Link } from "react-router-dom";

function Login(props) {
  const authContext = useContext(AuthContext);
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
      alert("Fill in all fields");
    } else {
      login({ username, password });
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/dashboard");
    }
  }, [isAuthenticated, props.history]);
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
            type='text'
            name='password'
            className='form-control'
            placeholder='Enter your password'
            value={password}
            onChange={onChange}
          />
        </div>
      </div>
      <button className='btn btn-block btn-secondary' onClick={onSubmit}>
        Submit
      </button>
    </Fragment>
  );
}

export default withRouter(Login);
