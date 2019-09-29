import React /*, { useReducer }*/ from 'react';
import axios from 'axios';
import QuestionContext from './questionContext';
// import QuestionReducer from './questionReducer';
// import types
// import { } from '../types';

const QuestionState = props => {
  //   const initialState = {};
  // const [state, dispatch] = useReducer(QuestionReducer, initialState);
  // time and/or app-related functions

  const sendQuestion = async formInfo => {

    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const resp = await axios.post("/api/questions/add", formInfo, config);
    console.log(resp)

  }

  const getQuestions = async () => {
    const quest = await axios.get("/api/questions/get")
    return (quest.data);
  }

  return (
    <QuestionContext.Provider value={{ sendQuestion, getQuestions }}>{props.children}</QuestionContext.Provider>
  );
};

export default QuestionState;
