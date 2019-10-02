import React, { Fragment, useContext, useState, useEffect } from "react";

const EditProfile = () => {
  const [info, setInfo] = useState({
    skype: "",
    github: "",
    discord: ""
  });
  const { skype, github, discord } = info;

  const onChange = e => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  return (
    <Fragment>
      <div className='row'>
        <div className='col-md-12'>
          <h1 className='text-center text-black'>Edit Your Information</h1>
        </div>
        <div className='col-md-12'>
          <h6 className='text-center text-dbrown small'>
            Verify, change, or add your usernames for the following
          </h6>
        </div>
      </div>
      <div className='form-group row'>
        <label htmlFor='github' className='col-md-1 col-form-label'>
          Github
        </label>
        <div className='col-md-11'>
          <input
            type='text'
            name='github'
            className='form-control'
            value={github}
            onChange={onChange}
          />
        </div>
      </div>
      <div className='form-group row'>
        <label htmlFor='skype' className='col-md-1 col-form-label'>
          Skype
        </label>
        <div className='col-md-11'>
          <input
            type='text'
            name='skype'
            className='form-control'
            value={skype}
            onChange={onChange}
          />
        </div>
      </div>
      <div className='form-group row'>
        <label htmlFor='discord' className='col-md-1 col-form-label'>
          Discord
        </label>
        <div className='col-md-11'>
          <input
            type='text'
            name='discord'
            className='form-control'
            value={discord}
            onChange={onChange}
          />
        </div>
      </div>
      <button className='btn btn-block btn-greyish'>Submit</button>
      <a href='/dashboard' style={{ textDecoration: "none" }}>
        <button className='btn btn-block btn-dbrown'>Cancel</button>
      </a>
    </Fragment>
  );
};

export default EditProfile;
