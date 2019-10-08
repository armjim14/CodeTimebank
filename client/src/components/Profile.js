import React, { Fragment, useContext, useEffect, useState } from "react";
import Stats from "./Stats";
import QuestionContext from "../Context/question/questionContext";
import TimeContext from "../Context/time/timeContext";
import AuthContext from "../Context/auth/authContext";
import FollowerContext from "../Context/follower/followerContext";

function Profile(props) {

  const [info, updateInfo] = useState({
    name: "",
    hours: 0,
    questions: []
  })

  const questionContext = useContext(QuestionContext);
  const { specificUser, specificQuestions } = questionContext;

  const timeContext = useContext(TimeContext);
  const { forUser } = timeContext;

  const authContext = useContext(AuthContext);
  const { getRepos, isAuthenticated, user } = authContext;

  const followerContext = useContext(FollowerContext);
  const { addFollower } = followerContext;

  const getHours = () => {

    if (info.hours) {
      return <span>{info.hours}</span>
    } else {
      return <span>0</span>
    }

  }

  const seeQuestions = () => {

    // console.log(info.questions.length);

    if (!info.questions || info.questions.length === 0) {
      return <div className="col-md-12 text-center">There are no questions</div>
    } else {
      console.log(info.questions)
      return info.questions.map(({ question, language, topic }, i) => {
        return (
          <div key={i} className="col-md-12 text-center">
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
      let hoursData = await forUser(idd);
      let { github, } = dataBack;

      if (hoursData.length > 1) {

        console.log(hoursData);
        let hours = hoursData.map(ar => ar.Time).reduce((a, b) => a + b)
        console.log(hours)

        updateInfo({
          name: github,
          questions,
          hours
        });

      } else if (hoursData.length === 1) {
        console.log(hoursData)
        updateInfo({
          name: github,
          questions,
          hours: hoursData[0].Time
        });

      } else {

        updateInfo({
          name: github,
          questions,
          hours: 0
        });

      }


    }
    fetchData();
    //eslint-disable-next-line
  }, []);

  const renderQuestions = () => {



    if (1 == 1) {


      return (
        <div className='col-md-12 text-center'>There are no questions</div>
      );
    } else {
      // console.log(info.questions);
      return info.questions.map(({ question, language, topic }, i) => {
        return (
          <div key={i} className='col-md-12 text-center'>
            <h3>{topic}</h3>
            <p>{language}</p>
            <p>{question}</p>
          </div>
        );
      });
    }
  };

  useEffect(() => {
    async function fetchData() {
      let idd = props.match.params.id;
      console.log(typeof(idd))
      let dataBack = await specificUser(idd);
      let questions = await specificQuestions(idd);
      let hoursData = await forUser(idd);
      let { github } = dataBack;
      getRepos(github);

      if (hoursData.length > 1) {
        let hours = hoursData.reduce((a, b) => a.Time + b.Time);
        updateInfo({
          name: github,
          questions,
          hours
        });
      } else if (hoursData.length === 1) {
        updateInfo({
          name: github,
          questions,
          hours: hoursData[0].Time
        });
      } else {
        updateInfo({
          name: github,
          questions,
          hours: 0
        });
      }
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

      {(!isAuthenticated || user.id === +props.match.params.id) ?
        console.log("No Button")
        :
        <div className='row mt-4'>
          <div className='col-md-12 d-flex justify-content-center'>
            <button
              className='btn btn-primary'
              onClick={() => {
                addFollower(+props.match.params.id);
              }}
            >Follow {info.name}</button>
          </div>
        </div>
      }

      <div className='row'>
        <div className='col-md-6'>
          <Stats name={info.name} />
        </div>
        <div className='col-md-6'>
          <p style={style.vert} className='text-center'>
            Credits: {getHours()}
          </p>
        </div>
      </div>

      <div className='row mb-5'>{seeQuestions()}</div>
    </Fragment>
  );
}

const style = {
  vert: {
    marginTop: "40%"
  }
};

export default Profile;
