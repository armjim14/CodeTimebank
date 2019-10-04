import React, { useContext, useEffect, Fragment, useState } from "react";
import questionContext from "../Context/question/questionContext";
import languages from "./data/languages.json"
import { setServers } from "dns";

function HelpOthers() {
  const QuestionContext = useContext(questionContext);
  const { getQuestions, loading } = QuestionContext;

  const allOptions = () => languages.map(({name}, i) => <option value={name} key={i}>{name}</option>)

  const [{lang, questions}, setLang] = useState({lang: "", questions: []})

  const testing = async e => {
    let value = e.target.value;
    console.log(value);
    setLang({lang: value});
    let all = await getQuestions(lang);
    console.log(all);
    await setLang({questions: all, lang: value})
  }

  const renderQuestions = () => {
    if (loading) {
      return <div>Loading</div>;
    } else {

      if (questions) {
        return questions.map(({ id, question, topic, language }) => {
          return (
            <div className="col-md-12" key={id}>
              <p>{topic}</p>
              <p>{language}</p>
              <p>{question}</p>
              <hr />
            </div>
          );
        });
      }

      return <div>No Questions</div>;
    }
  };

  // const testing = 

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
              <select id="lang" value={lang} onChange={testing} type="button" className="btn btn-secondary text-white dropdown-toggle">
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
