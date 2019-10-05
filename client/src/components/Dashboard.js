import React, { Fragment,useContext, useEffect, useState } from "react";
// import SimplePieChart from "./SimplePieChart";
import AuthContext from "../Context/auth/authContext";
import QuestionContext from "../Context/question/questionContext";
import Stats from "./Stats";
import TimeGauge from "./TimeGauge";

const Dashboard = (props) => {

  const [info, updateInfo] = useState({
    name: "",
    id: "",
    hours: 0,
    questions: []
  })

  const authContext = useContext(AuthContext);
  const { getUsernames } = authContext;

  const questionContext = useContext(QuestionContext);
  const { getUsersQuestions } = questionContext;

  const getHours = () => {
    
    if (info.hours){
      return <span>{info.hours}</span>
    } else {
      return <span>0</span>
    }
  
  }

  const seeQuestions = () => {

    console.log(info.questions.length);

    if (info.questions.length == 0){
      return <div className="col-md-12 text-center">There are no questions</div>
    } else {
      console.log(info.questions)
      return info.questions.map( ({id, question, language, topic}) => {
        return (
          <div key={id} className="col-md-12 text-center">
            <h3>{topic}</h3>
            <p>{language}</p>
            <p>{question}</p>
          </div>
        )
      })
    }
  }

  useEffect(() => {
    async function fetchData() {
      
      let dataBack = await getUsersQuestions();

      let { github, credits, id } = await getUsernames();

      updateInfo({
        name: github,
        hours: credits,
        id,
        questions: dataBack
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
          {/* <a href={`/user/${info.id}`} style={{ textDecoration: "none" }}> */}
            <button onClick={ () => {props.history.push(`/user/${info.id}`)}} className='btn btn-block btn-beige rounded-pill'>
              View Profile
            </button>
          {/* </a> */}
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
          <Stats />
        </div>
        <div className="col-md-6">
          <TimeGauge/>
          <p style={style.vert} className="text-center">Credits: {getHours()}</p>
        </div>
      </div>

      <div className="row mb-5">
        {seeQuestions()}
      </div>

    </Fragment>
  );
};

const style = {
  vert: {
    marginTop: "40%"
  }
}

export default Dashboard;
