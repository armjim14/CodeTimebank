import React, { Fragment, useContext, useEffect, useState } from "react";
import SimplePieChart from "./SimplePieChart";
import QuestionContext from "../Context/question/questionContext";

function Profile(props) {

    const [info, updateInfo] = useState({
        name: "",
        id: "",
        hours: 0,
        questions: []
      })
    
      const questionContext = useContext(QuestionContext);
      const { specificUser, specificQuestions } = questionContext;
    
      const getHours = () => {
        
        if (info.hours){
          return <span>{info.hours}</span>
        } else {
          return <span>0</span>
        }
      
      }
    
      const seeQuestions = () => {
    
        // console.log(info.questions.length);
    
        if (!info.questions || info.questions.length == 0){
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

          let idd = props.match.params.id
          
          let dataBack = await specificUser(idd);
          let questions = await specificQuestions(idd)

          console.log(dataBack)
    
          let { github, credits } = dataBack;
    
          updateInfo({
            name: github,
            hours: credits,
            questions
          });
    
        }
        fetchData();
        //eslint-disable-next-line
      }, []);
    
      return (
        <Fragment>
          <div className='row'>
            <div className='col-md-12'>
              <h1 className='text-center text-black'>{info.name} Profile</h1>
            </div>
          </div>
    
          <div className="row mt-4">
            <div className="col-md-12">
              <h2 className="text-center">{info.name}</h2>
            </div>
          </div>
    
          <div className="row">
            <div className="col-md-6">
              <SimplePieChart />
            </div>
            <div className="col-md-6">
              <p style={style.vert} className="text-center">Credits: {getHours()}</p>
            </div>
          </div>
    
          <div className="row mb-5">
            {seeQuestions()}
          </div>
    
        </Fragment>
      );
}

const style = {
  vert: {
    marginTop: "40%"
  }
}

export default Profile
