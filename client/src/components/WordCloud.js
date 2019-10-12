import React, { useContext, useState, useEffect } from "react";
import ReactWordcloud from "react-wordcloud";
import QuestionContext from "../Context/question/questionContext";
import "./WordCloud.css"

function WordCloud() {
  const questionContext = useContext(QuestionContext);
  const { wordCloudQuestions } = questionContext;

  const [cloudfriends, setWords] = useState({ array: [] });

  useEffect(() => {
    async function getData() {
      let cloudWords = await wordCloudQuestions();
      setWords({ array: cloudWords });
    }
    getData();
    //eslint-disable-next-line
  }, []);

  return (
    <div style={{ height: 400, width: 600 }} className='img-fluid word-cloud'>
      {cloudfriends.array.length > 0 ? (
        <ReactWordcloud className="cloud" words={cloudfriends.array} alt='Word Cloud' />
      ) : (
        <h6>Insufficient data to render word cloud</h6>
      )}
    </div>
  );
}
export default WordCloud;
