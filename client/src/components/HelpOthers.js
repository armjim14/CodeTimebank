import React, { useContext, useEffect, Fragment, useState } from "react";
import questionContext from "../Context/question/questionContext";
import languages from "./data/languages.json"
import timeContext from "../Context/time/timeContext";

function HelpOthers() {

  const QuestionContext = useContext(questionContext);
  const { getQuestions, loading } = QuestionContext;

  const TimeContext = useContext(timeContext);
  const { AddCredit } = TimeContext;


  const allOptions = () => languages.map(({name}, i) => <option value={name} key={i}>{name}</option>)

  const [{lang, questions}, setLang] = useState({lang: "", questions: []})

  const testing = async e => {
    let value = e.target.value;
    let all = await getQuestions(e.target.value);
    console.log(all);
    await setLang({questions: all, lang: value})
  }

  const answerQuestion = (id) => {
    console.log(id)
    AddCredit(id, 1)
  }

  const renderQuestions = () => {
    console.log(languages)
    if (loading) {
      return <div>Loading</div>;
    } else {
      // let real = questions[0];

      if (questions) {
        return questions.map(({ id, question, topic, language, User }) => {
          return (
            <div className="col-md-12" key={id}>
              <p>{topic} by {User.username}</p>
              <p>{language}</p>
              <p>{question}</p>
              <button onClick={answerQuestion.bind(this, User.id)}>Answer Question</button>
              <hr />
            </div>
          );
        });
      }
      return <div>No Questions</div>;
    }
  };

  useEffect(
    () => {
      console.log(lang)
    },
    // eslint-disable-next-line
    []
  );

  return (
    <Fragment>
      <div className="row">
        <div className="col-md-12">
          <h1 className="text-center">Help Others</h1>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12 d-flex align-items-center justify-content-center">
              <select value={lang} onChange={testing} type="button" className="btn btn-secondary text-white dropdown-toggle">
                <option value="none">Select a Language</option>
                {allOptions()}
              </select>
        </div>
      </div>

      <div className="row">
        {renderQuestions()}
      </div>

    </Fragment>
  );
}

export default HelpOthers;
