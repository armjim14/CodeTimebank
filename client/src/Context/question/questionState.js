import React, { useReducer } from 'react';
import axios from 'axios';
import QuestionContext from './questionContext';
import questionReducer from './questionReducer';
// import types
// import { } from '../types';

const QuestionState = props => {

    // const initialState = {
    //   questions: []
    // };

  const [{questions}, dispatch] = useReducer(questionReducer, { questions: [] });

  const sendQuestion = async formInfo => {

    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const resp = await axios.post("/api/questions/add", formInfo, config);
    console.log(resp)

  }

  const getQuestions = () => {
    return axios.get("/api/questions/get")
      .then( resp => dispatch({type: "GET_LIST", items: resp.data}) )
      // .then(resp => resp.data)
      .catch(err => console.error(err));
  }

  return (
    <QuestionContext.Provider value={ sendQuestion, getQuestions, questions }>{props.children}</QuestionContext.Provider>
  );
};

export default QuestionState;
