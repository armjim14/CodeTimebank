import React, { Fragment, useState, useContext } from "react";
import AlertContext from "../Context/alert/alertContext";
import AuthContext from "../Context/auth/authContext";

const ChangePassword = props => {
  const [pass, setPass] = useState({
    original: "",
    password: "",
    password2: ""
  });
  const { original, password, password2 } = pass;

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const authContext = useContext(AuthContext);
  const { changePassword } = authContext;

  const onChange = e => {
    setPass({ ...pass, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();

    if (password !== password2) {
      setAlert(`New passwords don't match`, `danger`);
    } else if (password === original) {
      setAlert(`New password must be different from old password`, `danger`);
    } else {
      const res = await changePassword({
        oldPassword: original,
        password: password
      });
      if (res.status == 200) {
        setAlert("Password successfully changed!", "success");
        props.history.push("/dashboard");
      } else {
        setAlert("Something went wrong. Try again!", "danger");
      }
    }
  };

  return (
    <Fragment>
      <div style={{ marginTop: "90px" }} className='row'>
        <div className='col-md-12'>
          <h1 className='text-center text-black'>Change Password</h1>
        </div>
      </div>
      <div className='form-group row'>
        <div className='col-md-4'></div>
        <div className='col-md-4 text-center'>
          <label htmlFor='original' className='font-weight-bold'>
            Old Password:
          </label>
          <input
            type='password'
            name='original'
            className='form-control text-center'
            placeholder='Old Password'
            value={original}
            onChange={onChange}
          />
        </div>
        <div className='col-md-4'></div>
      </div>
      <div className='form-group row'>
        <div className='col-md-4'></div>
        <div className='col-md-4 text-center'>
          <label htmlFor='new' className='font-weight-bold'>
            New Password:
          </label>
          <div className='row'>
            <div className='col-md-12'>
              <input
                type='password'
                name='password'
                className='form-control text-center'
                placeholder='New Password'
                value={password}
                onChange={onChange}
              />
            </div>
            <div className='col-md-12'>
              <input
                type='password'
                name='password2'
                className='form-control text-center'
                placeholder='New Password Again'
                value={password2}
                onChange={onChange}
              />
            </div>
          </div>
        </div>
        <div className='col-md-4'></div>
      </div>
      <div className='row'>
        <div className='col-md-4'></div>
        <div className='col-md-4 text-center'>
          <button
            className='btn btn-block btn-mariner w-25 mx-auto text-white mb-5'
            onClick={onSubmit}
          >
            Submit
          </button>
        </div>
        <div className='col-md-4'></div>
      </div>
    </Fragment>
  );
};

export default ChangePassword;
