import React, { Fragment, useContext, useEffect, useState } from "react";
import Stats from "./Stats";
import QuestionContext from "../Context/question/questionContext";
import TimeContext from "../Context/time/timeContext";
import AuthContext from "../Context/auth/authContext";

function Profile(props) {
  const [info, updateInfo] = useState({
    name: "",
    hours: 0,
    questions: []
  });

  const questionContext = useContext(QuestionContext);
  const { specificUser, specificQuestions } = questionContext;

  const timeContext = useContext(TimeContext);
  const { forUser } = timeContext;

  const authContext = useContext(AuthContext);
  const {
    getRepos,
    getGithubInfo,
    ghAvatar,
    ghName,
    ghCompany,
    ghBlog,
    ghLocation,
    ghBio,
    ghRepos
  } = authContext;

  const getHours = () => {
    if (info.hours) {
      return <span>{info.hours}</span>;
    } else {
      return <span>0</span>;
    }
  };

  const seeQuestions = () => {
    // console.log(info.questions.length);

    if (!info.questions || info.questions.length === 0) {
      return (
        <div className='col-md-12 text-center'>There are no questions</div>
      );
    } else {
      console.log(info.questions);
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

      let dataBack = await specificUser(idd);
      let questions = await specificQuestions(idd);
      let hoursData = await forUser(idd);
      let { github } = dataBack;

      if (hoursData.length > 1) {
        console.log(hoursData);
        let hours = hoursData.map(ar => ar.Time).reduce((a, b) => a + b);
        console.log(hours);

        updateInfo({
          name: github,
          questions,
          hours
        });
      } else if (hoursData.length === 1) {
        console.log(hoursData);
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
      getGithubInfo(github);
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
        <div className='col-md-3'>
          <div className='thumbnail text-center'>
            <img src={ghAvatar} alt='Avatar' className='text-left' />
          </div>
        </div>
        <div className='col-md-9'>
          <div className='border-bottom border-black'>
            <h2 className='text-center text-black'>{info.name}'s Profile</h2>
          </div>
          <hr />
          <div className='row'>
            <div className='col-md-8'>
              <ul className='list-group'>
                <li className='list-group-item'>Name: {ghName}</li>
                <li>Location: {ghLocation}</li>
                <li>Company: {ghCompany}</li>
              </ul>
            </div>
            <div className='col-md-4'>
              <h6>Bio: {ghBio}</h6>
              <h6>Number of Repositories: {ghRepos}</h6>
              <a href={ghBlog} target='_blank' rel='noopener noreferrer'>
                {ghBlog}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className='row mt-4'>
        <div className='col-md-12'>
          <h2 className='text-center'>{info.name}</h2>
        </div>
      </div>

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
