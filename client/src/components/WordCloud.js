import React, { useContext, useState, useEffect } from "react";
import ReactWordcloud from "react-wordcloud";
import QuestionContext from "../Context/question/questionContext";
// import words from './data/words'

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
  }, []);

  return (
    <div
      style={{ height: 400, width: 600 }}
      className='text-center border rounded'
    >
      <h4 className='text-center'></h4>
      {cloudfriends.array.length > 0 ? (
        <ReactWordcloud words={cloudfriends.array} />
      ) : (
        <h6>No data to render</h6>
      )}
    </div>
  );
}
export default WordCloud;
