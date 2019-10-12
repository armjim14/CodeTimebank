import React, { Fragment, useContext, useState, useEffect } from "react";
import AuthContext from "../Context/auth/authContext";
import AlertContext from "../Context/alert/alertContext";

const EditProfile = props => {
  const [info, setInfo] = useState({
    skype: "",
    github: "",
    discord: "",
    hirable: ""
  });
  const { skype, github, discord, hirable } = info;

  const authContext = useContext(AuthContext);
  const { getUsernames, updateInfo } = authContext;
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const onChange = e => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    async function fetchData() {
      let { skype, github, discord, hirable } = await getUsernames();

      setInfo({
        skype,
        github,
        discord,
        hirable
      });
    }
    fetchData();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    hirable == "true"
      ? (document.getElementById("true").checked = "true")
      : (document.getElementById("false").checked = "false");
  }, [hirable]);

  const onSubmit = async e => {
    e.preventDefault();
    const res = await updateInfo({ skype, github, discord, hirable });
    if (res.status === 200) {
      setAlert("Contact information changed successfully!", "success");
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
        <div className='col-md-4'></div>

        <div className='col-md-12'>
          <h6 className='text-center text-cello'>
            Verify, change, or add your usernames for the following
          </h6>
        </div>
      </div>
      <div className='form-group row'>
        <div className='col-md-4'></div>

        <div className='col-md-4 text-center'>
          <label htmlFor='github' className='col-form-label'>
            <strong>Github:</strong>
          </label>
          <input
            type='text'
            name='github'
            className='form-control'
            value={github}
            onChange={onChange}
          />
        </div>
        <div className='col-md-4'></div>
      </div>
      <div className='form-group row'>
        <div className='col-md-4'></div>

        <div className='col-md-4 text-center'>
          <label htmlFor='skype' className='col-form-label'>
            <strong>Skype:</strong>
          </label>
          <input
            type='text'
            name='skype'
            className='form-control'
            value={skype}
            onChange={onChange}
          />
        </div>
        <div className='col-md-4'></div>
      </div>
      <div className='form-group row'>
        <div className='col-md-4'></div>

        <div className='col-md-4 text-center'>
          <label htmlFor='discord' className='col-form-label'>
            <strong>Discord:</strong>
          </label>
          <input
            type='text'
            name='discord'
            className='form-control'
            value={discord}
            onChange={onChange}
          />
        </div>
        <div className='col-md-4'></div>
      </div>
      <div className='row'>
        <div className='col-md-12 text-center mb-4'>
          <div className='form-check form-check-inline'>
            <input
              type='radio'
              className='form-check-input'
              name='hirable'
              value='true'
              id='true'
              onChange={onChange}
            />
            <label htmlFor='true' className='mb-0'>
              <i className='fas fa-check-square text-success mr-1' />
              Hireable
            </label>
          </div>
          <div className='form-check form-check-inline'>
            <input
              type='radio'
              className='form-check-input'
              name='hirable'
              value='false'
              id='false'
              onChange={onChange}
            />
            <label htmlFor='false' className='mb-0'>
              <i className='fas fa-ban text-rose mr-1' />
              Not Hireable
            </label>
          </div>
        </div>

        <div className='form-check form-check-inline'></div>
      </div>
      <div className='row mb-5'>
        <div className='col-md-4'></div>
        <button
          className='btn btn-block btn-mariner col-md-4'
          onClick={onSubmit}
        >
          Submit
        </button>
        <div className='col-md-4'></div>
      </div>
    </Fragment>
  );
};

export default EditProfile;
