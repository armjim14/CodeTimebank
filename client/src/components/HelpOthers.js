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
        return real.map(({ id, question, comfort, language }) => {
          return (
            <div key={id}>
              <p>{question}</p>
              <p>{comfort}</p>
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
      <h1>Help Others</h1>
      {renderQuestions()}
    </Fragment>
  );
}

export default HelpOthers;
