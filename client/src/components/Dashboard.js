import React, { Fragment,useContext, useEffect, useState } from "react";
import SimplePieChart from "./SimplePieChart";
import AuthContext from "../Context/auth/authContext";

const Dashboard = () => {

  const [info, updateInfo] = useState({
    name: "",
    hours: 0
  })

  const authContext = useContext(AuthContext);
  const { getUsernames } = authContext;

  const getHours = () => {

    console.log(info.hours)

    if (info.hours){
      console.log("Yes")
      return <span>{info.hours}</span>
    } else {
      console.log("No")
      return <span>0</span>
    }
  }

  useEffect(() => {
    async function fetchData() {

      let { github, credits } = await getUsernames();

      updateInfo({
        name: github,
        hours: credits
      });

    }
    fetchData();
    //eslint-disable-next-line
  }, []);

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

      <div className="row mt-4">
        <div className="col-md-12">
          <h2 className="text-center">Hello, {info.name}</h2>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <SimplePieChart />
        </div>
        <div className="col-md-6 pt-5">
          <p className="text-center pt-5">Credits {getHours()}</p>
        </div>
      </div>

    </Fragment>
  );
};

export default Dashboard;
