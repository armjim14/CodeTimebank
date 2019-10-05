import React, { useContext, useEffect, Fragment, useState } from "react";
import questionContext from "../Context/question/questionContext";

import { Link } from "react-router-dom";
import languages from "./data/languages.json";
import Moment from "react-moment";
import "moment-timezone";

function HelpOthers() {

  const QuestionContext = useContext(questionContext);
  const { getQuestions, loading } = QuestionContext;

  const allOptions = () =>
    languages.map(({ name }, i) => (
      <option value={name} key={i}>
        {name}
      </option>
    ));

  const [{ lang, questions }, setLang] = useState({ lang: "", questions: [] });

  const testing = async e => {
    let value = e.target.value;
    let all = await getQuestions(e.target.value);
    console.log(all);
    await setLang({ questions: all, lang: value });
  };

  const renderQuestions = () => {
    console.log(languages);
    if (loading) {
      return <div>Loading</div>;
    } else {
      // let real = questions[0];

      if (questions) {
        console.log(questions);
        return questions.map(
          ({ User, id, question, topic, createdAt, language, repo }) => {
            return (
              <div
                className='col-md-12 border border-dbrown rounded my-4 shadow'
                key={id}
              >
                <h3 className='text-center'>{topic}</h3>
                <hr className='mb-0' />
                <div className='row'>
                  <div className='col-md-6 pr-0'>
                    <h6 className='small text-right border border-right p-1'>
                      Language: {language}
                    </h6>
                  </div>
                  <div className='col-md-6 pl-0'>
                    <h6 className='text-left small border border-left p-1'>
                      Asked by{" "}
                      <Link to={`/user/${User.id}`}>{User.username}</Link> on{" "}
                      <Moment tz='America/Phoenix' format='LLL Z'>
                        {createdAt}
                      </Moment>
                    </h6>
                  </div>
                </div>
                <div className='row overflow-auto' style={{ height: "7rem" }}>
                  <p className='col-md-12'>{question}</p>
                </div>

                <hr />
                {repo !== "" && (
                  <Fragment>
                    <div className='row'>
                      <div className='col-md-12 text-center text-dbrown small'>
                        Github Repository: <a href={`${repo}`}>${repo}</a>
                      </div>
                    </div>
                    <hr />
                  </Fragment>
                )}

                <div className='row'>
                  <div className='col-md-2 text-right'>
                    <i className='fas fa-address-book' /> Contact{" "}
                    <Link to={`/user/${User.id}`}>{User.username}</Link>:
                  </div>
                  <div className='col-md-10 d-flex justify-content-around'>
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
                    {User.discord !== "" && (
                      <p>
                        <i
                          className='fab fa-discord'
                          style={{ color: "#7289DA" }}
                        />{" "}
                        {User.discord}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          }
        );
      }
      return <div>No Questions</div>;
    }
  };

  useEffect(
    () => {
      console.log(lang);
    },
    // eslint-disable-next-line
    []
  );

  return (
    <Fragment>
      <div className='row'>
        <div className='col-md-12'>
          <h1 className='text-center'>Help Others</h1>
        </div>
      </div>

      <div className='row'>
        <div className='col-md-12 form-group'>
          <select
            value={lang}
            onChange={testing}
            // type='button'
            className='text-black dropdown-toggle form-control'
          >
            <option value='none'>Select a Language</option>
            {allOptions()}
          </select>
        </div>
      </div>

      <div className='row'>{renderQuestions()}</div>
    </Fragment>
  );
}

export default HelpOthers;
