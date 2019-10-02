import React, { Fragment } from "react";
import SimplePieChart from "./SimplePieChart";

const Dashboard = () => {
  return (
    <Fragment>
      <div className='row'>
        <div className='col-md-12'>
          <h1 className='text-center text-black'>Dashboard</h1>
        </div>
      </div>
      <div className='row'>
        <div className='col-md-6'>
          <a href='#!' style={{ textDecoration: "none" }}>
            <button className='btn btn-block btn-beige rounded-pill'>
              View Profile
            </button>
          </a>
        </div>
        <div className='col-md-6'>
          <a href='/editprofile' style={{ textDecoration: "none" }}>
            <button className='btn btn-block btn-greyish rounded-pill'>
              Edit Profile
            </button>
          </a>
        </div>
      </div>
      <div>
        <p>Profile page</p>
        <SimplePieChart />
      </div>
    </Fragment>
  );
};

export default Dashboard;
