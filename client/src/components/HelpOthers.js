import React, { useContext, useEffect, Fragment } from "react";
import questionContext from "../Context/question/questionContext";

function HelpOthers() {
  const QuestionContext = useContext(questionContext);
  const { getQuestions, questions, loading } = QuestionContext;

  const renderQuestions = () => {
    if (loading) {
      return <div>Loading</div>;
    } else {
      let real = questions[0];

      if (real) {
        return real.map(({ id, question, topic, language }) => {
          return (
            <div className="col-md-12" key={id}>
              <p>{question}</p>
              <p>{topic}</p>
              <p>{language}</p>
              <hr />
            </div>
          );
        });
      }
      return <div>Not loading</div>;
    }
  };

  useEffect(
    () => {
      getQuestions();
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
      {renderQuestions()}
      </div>
      
    </Fragment>
  );
}

export default HelpOthers;
