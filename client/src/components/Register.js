import React, { useState, useContext, Fragment, useEffect } from "react";
import AuthContext from "../Context/auth/authContext";
import AlertContext from "../Context/alert/alertContext";

function Register(props) {
  const authContext = useContext(AuthContext);
  const { register, error, clearErrors, isAuthenticated } = authContext;
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const [user, setUser] = useState({
    name: "",
    password: "",
    password2: "",
    github: "",
    discord: "",
    skype: ""
  });
  const { name, password, password2, github, discord, skype } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });
  const onSubmit = async e => {
    e.preventDefault();
    if (
      name === "" ||
      password === "" ||
      password2 === "" ||
      github === "" ||
      discord === "" ||
      skype === ""
    ) {
      setAlert("Please fill in all fields!", "danger");
    } else if (name.split("").length < 2) {
      setAlert("Username must be at least 2 characters long", "danger");
    } else if (password !== password2) {
      setAlert("Passwords do not match", "danger");
    } else {
      register({ name, password, github, discord, skype });
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/dashboard");
    }
    if (error === "Username taken!") {
      setAlert(error, "danger");
      clearErrors();
    }
  }, [error, isAuthenticated, props.history]);

  return (
    <Fragment>
      <div className='row mt-2'>
        <h1 style={{fontSize: "2.4rem"}} className='col-md-12 text-center'>Register Below</h1>
      </div>
      <div className='row mt-3 mb-4'>
        <div className='col-md-12'>
          <h5 className='text-center'>
            <a href='/login' rel='noopener noreferrer'>
              Already registered? Click here to Login.
            </a>
          </h5>
        </div>
      </div>
      <div className='fullWidth d-flex justify-content-center'>
        <div className="loginStuff">
          {/* <div className='form-group row'> */}
          <label htmlFor='Username' className='col-md-12 col-form-label font-weight-bold'>
            Username:
        </label>
          <input
            type='text'
            name='name'
            className='form-control mb-4 inputStuff'
            placeholder='Enter your username for the Code Timebank here'
            value={name}
            onChange={onChange}
          />
          {/* </div> */}
          {/* <div className='form-group row'> */}
          <label htmlFor='Password' className='col-md-12 col-form-label font-weight-bold'>
            Password:
        </label>
          {/* <div className='col-md-5'> */}
          <input
            type='password'
            name='password'
            className='form-control mb-2 inputStuff'
            placeholder='Super secret password'
            value={password}
            onChange={onChange}
          />
          {/* </div> */}
          {/* <div className='col-md-5'> */}
          <input
            type='password'
            name='password2'
            className='form-control mb-4 inputStuff'
            placeholder='Enter it again'
            value={password2}
            onChange={onChange}
          />
          {/* </div> */}
          {/* </div> */}
          {/* <div className='form-group row'> */}
          <label htmlFor='Github' className='col-md-12 col-form-label font-weight-bold'>
            Github Username:
        </label>
          {/* <div className='col-md-9'> */}
          <input
            type='text'
            name='github'
            className='form-control mb-4 inputStuff'
            placeholder='Enter your Github username here'
            value={github}
            onChange={onChange}
          />
          {/* </div> */}
          {/* </div> */}
          {/* <div className='form-group row'> */}
          <label htmlFor='Discord' className='col-md-12 col-form-label font-weight-bold'>
            Discord Username:
        </label>
          {/* <div className='col-md-9'> */}
          <input
            type='text'
            name='discord'
            className='form-control mb-4 inputStuff'
            placeholder='Username#1234'
            value={discord}
            onChange={onChange}
          />
          {/* </div> */}
          {/* </div> */}
          {/* <div className='form-group row'> */}
          <label htmlFor='Skype' className='col-md-12 col-form-label font-weight-bold'>
            Skype Username:
        </label>
          {/* <div className='col-md-9'> */}
          <input
            type='text'
            name='skype'
            className='form-control inputStuff'
            placeholder='Skype Username Here'
            value={skype}
            onChange={onChange}
          />
          <div className="forButton d-flex justify-content-center mt-2" style={{ width: "100%" }}>
            <button style={{ marginBottom: "60px" }} className='btn btn-greyish mt-3' onClick={onSubmit}>
              Submit
          </button>
          </div>
        </div>
      </div>


    </Fragment>
  );
}

export default Register;

{/* <Fragment>
<div className='row'>
  <h1 className='col-md-12 text-center'>Register Below</h1>
</div>
<div className='row mt-3 mb-4'>
  <div className='col-md-12'>
    <h5 className='text-center'>
      <a href='/login' rel='noopener noreferrer'>
        Already registered? Click here to Login.
      </a>
    </h5>
  </div>
</div>
<div className='form-group row'>
  <label htmlFor='Username' className='col-md-3 col-form-label'>
    Username
  </label>
  <div className='col-md-9'>
    <input
      type='text'
      name='name'
      className='form-control'
      placeholder='Enter your username for the Code Timebank here'
      value={name}
      onChange={onChange}
    />
  </div>
</div>
<div className='form-group row'>
  <label htmlFor='Password' className='col-md-2 col-form-label'>
    Password
  </label>
  <div className='col-md-5'>
    <input
      type='password'
      name='password'
      className='form-control'
      placeholder='Super secret password'
      value={password}
      onChange={onChange}
    />
  </div>
  <div className='col-md-5'>
    <input
      type='password'
      name='password2'
      className='form-control'
      placeholder='Enter it again'
      value={password2}
      onChange={onChange}
    />
  </div>
</div>
<div className='form-group row'>
  <label htmlFor='Github' className='col-md-3 col-form-label'>
    Github Username
  </label>
  <div className='col-md-9'>
    <input
      type='text'
      name='github'
      className='form-control'
      placeholder='Enter your Github username here'
      value={github}
      onChange={onChange}
    />
  </div>
</div>
<div className='form-group row'>
  <label htmlFor='Discord' className='col-md-3 col-form-label'>
    Discord Username
  </label>
  <div className='col-md-9'>
    <input
      type='text'
      name='discord'
      className='form-control'
      placeholder='Username#1234'
      value={discord}
      onChange={onChange}
    />
  </div>
</div>
<div className='form-group row'>
  <label htmlFor='Skype' className='col-md-3 col-form-label'>
    Skype Username
  </label>
  <div className='col-md-9'>
    <input
      type='text'
      name='skype'
      className='form-control'
      placeholder='Skype Username Here'
      value={skype}
      onChange={onChange}
    />
  </div>
</div>
<button className='btn btn-block btn-greyish' onClick={onSubmit}>
  Submit
</button>
</Fragment> */}
