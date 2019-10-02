import React, { Fragment, useContext, useState, useEffect } from "react";
import AuthContext from "../Context/auth/authContext";
import AlertContext from "../Context/alert/alertContext";

const EditProfile = props => {
  const [info, setInfo] = useState({
    skype: "",
    github: "",
    discord: ""
  });
  const { skype, github, discord } = info;

  const authContext = useContext(AuthContext);
  const { getUsernames, updateInfo } = authContext;
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const onChange = e => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    async function fetchData() {
      let { skype, github, discord } = await getUsernames();

      setInfo({
        skype,
        github,
        discord
      });
    }
    fetchData();
    //eslint-disable-next-line
  }, []);

  const onSubmit = async e => {
    e.preventDefault();
    const res = await updateInfo({ skype, github, discord });
    if (res.status === 200) {
      props.history.push("/dashboard");
    } else {
      setAlert("Server malfunction", "danger");
    }
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
      <button className='btn btn-block btn-greyish' onClick={onSubmit}>
        Submit
      </button>
      <a href='/dashboard' style={{ textDecoration: "none" }}>
        <button className='btn btn-block btn-dbrown'>Cancel</button>
      </a>
    </Fragment>
  );
};

export default EditProfile;
