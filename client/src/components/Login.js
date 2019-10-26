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
      <div className='row pt-3 pb-3'>
        <h1 className='col-md-12 text-center'>Login</h1>
      </div>
      <div className='row'>
        <div className='fullWidth d-flex justify-content-center'>
          <div className="loginStuff">
            <input
              type='email'
              name='username'
              className='form-control inputStuff mb-3 mr-0'
              placeholder='Email guest( a@a.com )'
              value={username}
              onChange={onChange}
            />
            <input
              type='password'
              name='password'
              className='form-control inputStuff'
              placeholder='Password guest( a )'
              value={password}
              onChange={onChange}
            />
            <div className="forButton d-flex justify-content-center mt-4" style={{width: "100%"}}>
              <button className='btn btn-primary btn-greyish' onClick={onSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='row mt-4 mt-3'>
        <div className='col-md-12'>
          <h5 className='text-center'>
            <a href='/register' rel='noopener noreferrer' className="text-jgreen">
              Not registered? Click here to register.
            </a>
          </h5>
        </div>
      </div>
      <div className='row mt-4 mt-3'>
        <div className='col-md-12'>
          <h5 className='text-center'>
            <a className="text-rose" href='/forgotPassword' rel='noopener noreferrer'>
              Forgot Password
            </a>
          </h5>
        </div>
      </div>

    </Fragment>
  );
}

export default withRouter(Login);
