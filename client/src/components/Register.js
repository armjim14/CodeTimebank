import React, { useState, useContext, Fragment, useEffect } from "react";
import AuthContext from "../Context/auth/authContext";

function Register(props) {
  const authContext = useContext(AuthContext);
  const { register, error, clearErrors, isAuthenticated } = authContext;

  const [user, setUser] = useState({
    name: "",
    password: "",
    github: "",
    discord: "",
    skype: ""
  });
  const { name, password, github, discord, skype } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();
    if (
      name === "" ||
      password === "" ||
      github === "" ||
      discord === "" ||
      skype === ""
    ) {
      alert("Please fill in all fields!");
    } else {
      register({ name, password, github, discord, skype });
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
        <h1 className='col-md-12 text-center'>Register Below</h1>
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
        <label htmlFor='Password' className='col-md-3 col-form-label'>
          Password
        </label>
        <div className='col-md-9'>
          <input
            type='password'
            name='password'
            className='form-control'
            placeholder='Super secret password'
            value={password}
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
      <button className='btn btn-block btn-secondary' onClick={onSubmit}>
        Submit
      </button>
    </Fragment>
  );
}

export default Register;
