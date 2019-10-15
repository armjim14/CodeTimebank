import React, { Fragment, useContext, useEffect, useState } from "react";
import Stats from "./Stats";
import QuestionContext from "../Context/question/questionContext";
import TimeContext from "../Context/time/timeContext";
import AuthContext from "../Context/auth/authContext";
import Moment from "react-moment";
import TimeGauge from "./TimeGauge";
import "moment-timezone";
import { BrowserRouter as Link } from "react-router-dom";
import FollowerContext from "../Context/follower/followerContext";

function Profile(props) {
  const [info, updateInfo] = useState({
    name: "",
    hours: 0,
    skype: "",
    discord: "",
    questions: [],
    isFollower: null
  });
  const { hours } = info;

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
  const { addFollower, getFollowers, deleteFollower } = followerContext;

  const seeQuestions = () => {
    // console.log(info.questions.length);

    if (!info.questions || info.questions.length === 0) {
      return (
        <div className='col-md-12 text-center'>There are no questions</div>
      );
    } else {
      console.log(info.questions);
      return info.questions.map(
        ({ id, question, language, topic, createdAt, repo, User }, i) => {
          return (
            <div
              style={{padding: "0 15px 0 15px"}}
              className='queslen border border-dbrown rounded my-4 shadow'
              key={id}
            >
            <h3 className='text-center mt-2'>{topic}</h3>
            <hr className='mb-0 mt-0' />
            <div style={{ fontSize: "1.1rem" }} className='row'>
              <div className='col-md-6 pr-0'>
                <h6 className='small text-center border border-right p-1'>
                  Language: {language}
                </h6>
              </div>
              <div className='col-md-6 pl-0'>
                <h6 className='text-center small border border-left p-1'>
                  <Moment tz='America/Phoenix' format='LLL Z'>
                    {createdAt}
                  </Moment>
                </h6>
              </div>
            </div>
            <div
              className='row overflow-hidden'
              style={{ height: "7rem", wordBreak: "break-all" }}
            >
              <p className='col-md-12'>{question}</p>
            </div>
            <div className='col-md-12 d-flex justify-content-around'>
              <button
                className='btn btn-outline-glacier'
                onClick={ChangeHeight}
              >
                See More
              </button>
            </div>
            <hr />
            {repo !== "" && (
              <Fragment>
                <div className='row'>
                  <div className='col-md-12 text-center text-dbrown small'>
                    Github Repository: <a style={{fontSize: "1rem", wordBreak: "break-all"}} href={`${repo}`}>${repo}</a>
                  </div>
                </div>
                <hr />
              </Fragment>
            )}

            <div className='row'>
              <div className='col-md-4 text-center'>
                <i className='fas fa-address-book' /> Contact{" "}
                <Link to={`/user/${User.id}`}>{User.github}</Link>:
              </div>
              <div className='col-md-4 text-center'>
                {User.skype !== "" && (
                  <p>
                    <a href={`skype:${User.skype}?chat`}>
                      <i className='fab fa-skype text-primary'>
                        {" "}
                        {User.skype}
                      </i>
                    </a>
                  </p>
                )}
              </div>
              <div className='col-md-4 text-center'>
                {User.discord !== "" && (
                  <a href='https://discord.gg/WGBFhcj' target='__blank'>
                    <i
                      className='fab fa-discord'
                      style={{ color: "#7289DA" }}
                    />{" "}
                    {User.discord}
                  </a>
                )}
              </div>
            </div>
          </div>          );
        }
      );
    }
  };

  const ChangeHeight = e => {
    e.preventDefault();

    if (e.target.parentNode.previousSibling.style.height === "7rem") {
      e.target.parentNode.previousSibling.style.height = "auto";
      e.target.innerText = "See Less";
    } else {
      e.target.parentNode.previousSibling.style.height = "7rem";
      e.target.innerText = "See More";
    }
  };


  useEffect(() => { // working
    async function fetchData() {
      let idd = props.match.params.id;

      let dataBack = await specificUser(idd);
      let questions = await specificQuestions(idd);
      let hoursData = await forUser(idd);
      let isFollowing = await getFollowers();
      console.log(isFollowing);

      let whichButton = null;

      if (isFollowing) {
        for (let v in isFollowing) {
          if (+idd === isFollowing[v].followerId) {
            whichButton = true;
          }
        }
      }

      let { github, skype, discord } = dataBack;

      if (hoursData.length > 1) {
        console.log(hoursData);
        let hours = hoursData.map(ar => ar.Time).reduce((a, b) => a + b);
        console.log(hours);

        updateInfo({
          name: github,
          questions,
          hours,
          skype,
          discord,
          isFollower: whichButton
        });
      } else if (hoursData.length === 1) {
        console.log(hoursData);
        updateInfo({
          name: github,
          questions,
          skype,
          discord,
          isFollower: whichButton,
          hours: hoursData[0].Time
        });
      } else {
        updateInfo({
          name: github,
          questions,
          skype,
          discord,
          hours: 0,
          isFollower: whichButton
        });
      }
      getGithubInfo(github);
    }
    fetchData();
    //eslint-disable-next-line
  }, [info.isFollower]);

  const correctButton = () => {

    console.log(info)
    console.log(info.skype)

    if (!isAuthenticated) {
      return <p className="text-jgreen">Register to follow users</p>
    } else if (user.id === +props.match.params.id) {

      return <p className="text-jgreen mb-2">You are unable to follow yourself</p>

    } else if (info.isFollower) {
      return (
        <Fragment>
        <button
          className='btn btn-rose mx-auto mb-1'
          onClick={() => {
            deleteFollower(props.match.params.id)
            updateInfo({
              ...info,
              isFollower: false
            })
          }}
        >
          Unfollow {info.name}
        </button>
        <br />
        </Fragment>
      );
    } else {
      return (
        <Fragment>
        <button
          className='btn btn-mariner mx-auto mb-1'
          onClick={() => {
            addFollower(+props.match.params.id);
            updateInfo({
              ...info,
              isFollower: true
            })

          }}
        >
          Follow {info.name}
        </button>
        <br />
        </Fragment>
      );
    }
  }

  useEffect(() => {
    async function fetchData() {
      let idd = props.match.params.id;
      console.log(typeof idd);
      let dataBack = await specificUser(idd);
      let questions = await specificQuestions(idd);
      let hoursData = await forUser(idd);
      let { github, skype, discord } = dataBack;
      getRepos(github);

      console.log(skype)

      if (hoursData.length > 1) {
        let hours = hoursData.reduce((a, b) => a.Time + b.Time);
        updateInfo({
          name: github,
          questions,
          hours,
          skype: skype,
          discord,
          isFollower: info.isFollower
        });
      } else if (hoursData.length === 1) {
        updateInfo({
          name: github,
          questions,
          skype: skype,
          discord,
          isFollower: info.isFollower,
          hours: hoursData[0].Time
        });
      } else {
        updateInfo({
          name: github,
          questions,
          skype: skype,
          discord,
          isFollower: info.isFollower,
          hours: 0
        });
      }
    }
    fetchData();
    //eslint-disable-next-line
  }, [info.isFollower]);

  return (
    <Fragment>
      <div className='row'>
        <div className='col-md-2'>
          <div className='h-100 w-100'>
            <img
            style={{marginTop: "40px"}}
              src={ghAvatar}
              alt='Avatar'
              className='d-block img-fluid rounded shadow'
            />
          </div>
        </div>
        <div className='col-md-10 mt-4'>
          <div className='mb-3'>
            <h2 className='text-left text-black'>{info.name}'s Profile</h2>
            {correctButton()}
            <a 
              className="linkHover"
              href={`skype:${info.skype}?chat`}
              target="__target"
            ><i className='fab fa-skype text-primary' /> {info.skype}</a>
            <br />
            <a 
              className="linkHover"
              href='https://discord.gg/WGBFhcj'
              target="__target"
            ><i className='fab fa-discord' style={{ color: "#7289DA" }} /> {info.discord}</a>
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
                    <strong className='mx-2'>Website:</strong>
                    <a style={{wordBreak: "break-all"}} href={ghBlog} target='_blank' rel='noopener noreferrer'>
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
        <div className='col-lg-6 col-md-6 col-sm-6 d-flex justify-content-center align-items-center'>
          <div>
            <h3 className='text-center'>Recent Languages</h3>
            <Stats name={info.name} className='mr-3' />
          </div>
          </div>
          <div className='col-lg-6 col-md-6 col-sm-6 d-flex text-center justify-content-center align-items-center'>

          {hours > 0 || hours < 0 ? (
            
            <div>
              <h3 className='text-center'>Time Banked</h3>
              <TimeGauge hours={hours} />
              <h3>Credits: {hours}</h3>
            </div>
          ) : (
              <h3>Credits: {hours}</h3>
            )}
            
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
