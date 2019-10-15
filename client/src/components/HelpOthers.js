import React, { useContext, useEffect, Fragment, useState } from "react";
import questionContext from "../Context/question/questionContext";
import followerContext from "../Context/follower/followerContext";
import WordCloud from "./WordCloud";
import { Link } from "react-router-dom";
import languages from "./data/languages.json";
import Moment from "react-moment";
import "moment-timezone";

function HelpOthers() {
  const QuestionContext = useContext(questionContext);
  const { getQuestions, loading, specificQuestions } = QuestionContext;

  const FollowerContext = useContext(followerContext);
  const { getFollowers } = FollowerContext;

  const allOptions = () =>
    languages.map(({ name }, i) => (
      <option value={name} key={i}>
        {name}
      </option>
    ));

  const [{ lang, questions, fol, friends }, setLang] = useState({
    lang: "",
    questions: [],
    fol: false,
    friends: []
  });

  const testing = async e => {
    let value = e.target.value;
    let all = await getQuestions(e.target.value);
    console.log(all);
    await setLang({ questions: all, lang: value, fol: false, friends });
  };

  const renderFol = () => {
    if (friends.length > 0) {
      return friends.map(
        ({ topic, language, id, User, question, repo, createdAt }) => {
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
                    Asked by <Link to={`/user/${User.id}`}>{User.github}</Link>{" "}
                    on{" "}
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
                <div className='col-md-4 d-flex justify-content-around'>
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
                <div className='col-md-4 d-flex justify-content-around'>
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
            </div>
          );
        }
      );
    } else {
      return (
        <Fragment>
          <div className='col-md-12 text-center mt-5'>
            <h3>No questions found.</h3>
          </div>
          <div className='col-md-12 d-flex justify-content-center w-100 my-3'>
            <WordCloud />
          </div>
        </Fragment>
      );
    }
  };

  const renderQuestions = () => {
    if (loading) {
      return <div>Loading</div>;
    } else {
      if (questions.length > 0) {
        return questions.map(
          ({
            User,
            id,
            question,
            topic,
            createdAt,
            language,
            repo,
            solved //eslint-disable-next-line
          }) => {
            if (solved) {
              console.log("dont send question");
            } else {
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
                        Asked by{" "}
                        <Link to={`/user/${User.id}`}>{User.github}</Link> on{" "}
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
                </div>
              );
            }
          }
        );
      } else {
        return (
          <Fragment>
            {lang && (
              <div className='col-md-12 text-center mt-5'>
                <h3>No questions found.</h3>
              </div>
            )}
            <div className='col-md-12 d-flex justify-content-center w-100 my-3'>
              <WordCloud />
            </div>
          </Fragment>
        );
      }
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

  useEffect(() => {
    async function getData() {
      let resp = await getFollowers();
      // console.log(resp);

      if (resp.length > 0) {
        let friends = [];

        for (let e in resp) {
          let info = await specificQuestions(resp[e].followerId);
          // console.log(info);
          for (let v in info) {
            if (info[v].solved) {
              // console.log("dont pass");
            } else {
              friends.push(info[v]);
            }
          }
        }

        console.log(friends);

        setLang({
          lang,
          fol,
          questions,
          friends
        });
      }
    }
    getData();
    //eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <div style={{marginTop: "90px"}} className='row mb-3'>
        <div className='col-md-12'>
          <h1 className='text-center'>Help Others</h1>
        </div>
      </div>

      <div className='row bg-gradient-brown py-2'>
        <div className='col-md-6 d-flex justify-content-center w-100 py-2'>
          {/* <div className='form-group my-auto'> */}
          <button
            className='btn btn-greyish btn-rounded text-black'
            onClick={() => {
              setLang({
                lang: "",
                questions,
                friends,
                fol: true
              });
            }}
          >
            Friends' Questions
          </button>
        </div>
        <div className='col-md-6 d-flex justify-content-center form-group my-auto'>
          <select
            value={lang}
            onChange={testing}
            // type='button'
            className='text-black dropdown-toggle form-control w-75'
          >
            <option value='none'>Select a Language</option>
            {allOptions()}
          </select>
        </div>
      </div>
      <div className='row mb-4'>{fol ? renderFol() : renderQuestions()}</div>
    </Fragment>
  );
}

export default HelpOthers;
