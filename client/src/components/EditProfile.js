import React, { Fragment, useContext, useState, useEffect } from "react";

const EditProfile = () => {
  const [info, setInfo] = useState({
    skype: "",
    github: ""
  });
  return (
    <Fragment>
      <div className='row'>
        <h1 className='text-center text-black'>Edit Your Information</h1>
      </div>
      <div className='form-group row'>
        <label htmlFor='skype' className='col-md-2 col-form-label'></label>
        <div className='col-md-10'>
          <input
            type='text'
            name='skype'
            className='form-control'
            value={skype}
            onChange={onChange}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default EditProfile;
