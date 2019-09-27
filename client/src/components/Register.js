import React, { Fragment } from "react";

function Register() {
  return (
    <Fragment>
      <div className='row'>
        <h1 className='col-md-12 text-center'>Register Below</h1>
      </div>
      <div className='form-group row'>
        <label for='Username' class='col-md-3 col-form-label'>
          Username
        </label>
        <div className='col-md-9'>
          <input
            type='text'
            name='Username'
            id='uname'
            className='form-control'
            placeholder='Enter your username for the Code Timebank here'
          />
        </div>
      </div>
      <div className='form-group row'>
        <label for='Password' class='col-md-3 col-form-label'>
          Password
        </label>
        <div className='col-md-9'>
          <input
            type='password'
            name='Password'
            id='pword'
            className='form-control'
            placeholder='Super secret password'
          />
        </div>
      </div>
      <div className='form-group row'>
        <label for='Github' class='col-md-3 col-form-label'>
          Github Username
        </label>
        <div className='col-md-9'>
          <input
            type='text'
            name='Github'
            id='ghubname'
            className='form-control'
            placeholder='Enter your Github username here'
          />
        </div>
      </div>
      <div className='form-group row'>
        <label for='Discord' class='col-md-3 col-form-label'>
          Discord Username
        </label>
        <div className='col-md-9'>
          <input
            type='text'
            name='Discord'
            id='discord'
            className='form-control'
            placeholder='Username#1234'
          />
        </div>
      </div>
      <button className='btn btn-block btn-secondary' onClick={""}>
        Submit
      </button>
    </Fragment>
  );
}

export default Register;
