import React, { Fragment, useContext, useEffect, useState } from "react";
import Stats from "./Stats";
import QuestionContext from "../Context/question/questionContext";
import TimeContext from "../Context/time/timeContext";
import AuthContext from "../Context/auth/authContext";
import Moment from "react-moment";
import "moment-timezone";
import { BrowserRouter as Link } from "react-router-dom";
import FollowerContext from "../Context/follower/followerContext";

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
    ghRepos,
    isAuthenticated,
    user
  } = authContext;

  const followerContext = useContext(FollowerContext);
  const { addFollower } = followerContext;

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
      return info.questions.map(
        ({ question, language, topic, createdAt, repo, User }, i) => {
          return (
            <div
              key={i}
              className='col-md-12 text-center border border-dbrown rounded my-4 shadow'
            >
              <h3 className='text-center'>{topic}</h3>
              <hr />
              <p>{language}</p>
              <hr />
              <span>Asked on </span>
              <Moment tz='America/Phoenix' format='LLL Z'>
                {createdAt}
              </Moment>
              <p>{question}</p>
              <hr />
              {repo !== "" && (
                <Fragment>
                  <div className='row'>
                    <div className='col-md-12 text-center text-dbrown small'>
                      Github Repository: <a href={`${repo}`}>{repo}</a>
                    </div>
                  </div>
                  <hr />
                </Fragment>
              )}
              <div className='row'>
                <div className='col-md-12 text-center'>
                  <i className='fas fa-address-book' /> Contact{" "}
                  <Link to={`/user/${User.id}`}>{User.username}</Link>:
                  {User.skype !== "" && (
                    <span className='mx-3'>
                      <a href={`skype:${User.skype}?chat`}>
                        <i className='fab fa-skype text-primary'>
                          {" "}
                          {User.skype}
                        </i>
                      </a>
                    </span>
                  )}
                  {User.discord !== "" && (
                    <span className='mx-3'>
                      <i
                        className='fab fa-discord'
                        style={{ color: "#7289DA" }}
                      />{" "}
                      {User.discord}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        }
      );
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
      console.log(typeof idd);
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
      <div className='row mt-3'>
        <div className='col-md-3'>
          <div className='img-thumbnail h-100 w-100 shadow'>
            <img
              src={ghAvatar}
              alt='Avatar'
              className='d-block m-auto img-fluid'
            />
          </div>
        </div>
        <div className='col-md-9'>
          <div className='border-bottom border-black'>
            <h2 className='text-left text-black'>{info.name}'s Profile</h2>
            {!isAuthenticated || user.id === +props.match.params.id ? (
              console.log("No Button")
            ) : (
              <button
                className='btn btn-primary mx-auto mb-1'
                onClick={() => {
                  addFollower(+props.match.params.id);
                }}
              >
                Follow {info.name}
              </button>
            )}
          </div>
          <hr />
          <div className='row'>
            <div className='col-md-6 d-flex col-sm-12'>
              <ul className='list-group d-flex w-100 h-100 shadow'>
                {ghName && (
                  <li className='list-group-item flex-fill d-flex justify-content-start align-items-center'>
                    <i className='far fa-address-card mr-2' />
                    <strong className='mx-2'>Name:</strong>
                    <span>{ghName}</span>
                  </li>
                )}
                {ghLocation && (
                  <span className='list-group-item flex-fill d-flex justify-content-start align-items-center'>
                    <i className='fas fa-city mr-2' />
                    <strong className='mx-2'>Location:</strong>
                    <span>{ghLocation}</span>
                  </span>
                )}

                {ghCompany && (
                  <li className='list-group-item  flex-fill d-flex justify-content-start align-items-center'>
                    <i className='fas fa-business-time mr-2' />
                    <strong className='mx-2'>Company:</strong>
                    <span>{ghCompany}</span>
                  </li>
                )}
              </ul>
            </div>
            <div className='col-md-6 d-flex col-sm-12'>
              <ul className='list-group d-flex w-100 h-100 shadow'>
                {ghBio && (
                  <li className='list-group-item flex-fill d-flex justify-content-start align-items-center'>
                    <i className='fas fa-book-reader mr-2' />
                    <strong className='mx-2'>Bio:</strong>
                    <span>{ghBio}</span>
                  </li>
                )}
                {ghRepos && (
                  <li className='list-group-item flex-fill d-flex justify-content-start align-items-center'>
                    <i className='fas fa-code mr-2' />
                    <strong className='mx-2'>Number of Repositories:</strong>
                    <span>{ghRepos}</span>
                  </li>
                )}
                {ghBlog && (
                  <li className='list-group-item flex-fill d-flex justify-content-start align-items-center'>
                    <i className='fas fa-link mr-2' />
                    <strong className='mx-2'>Portfolio:</strong>
                    <a href={ghBlog} target='_blank' rel='noopener noreferrer'>
                      {ghBlog}
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className='row mt-4'>
        <div className='col-md-12'>
          <h2 className='text-center'>Stats</h2>
          <hr />
        </div>
      </div>

      <div className='row'>
        <div className='col-md-12 d-flex justify-content-center align-items-center'>
          <Stats name={info.name} className='mr-3' />
          <p className='ml-3'>Credits: {getHours()}</p>
        </div>
      </div>

      <div className='row'>
        <div className='col-md-12'>
          <h1 className='text-center'>Questions</h1>
          <hr />
        </div>
      </div>

      <div className='row mb-5'>
        <div className='col-md-12'>{seeQuestions()}</div>
      </div>
    </Fragment>
  );
}

export default Profile;
