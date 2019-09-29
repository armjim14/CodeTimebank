import React, { useReducer } from 'react';
import axios from 'axios';
import QuestionContext from './questionContext';
import questionReducer from './questionReducer';
// import types
// import { } from '../types';

const QuestionState = props => {
    const initialState = {
      questions: []
    };
  const [state, dispatch] = useReducer(questionReducer, initialState);
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

  const getQuestions = () => {
    dispatch({ type: "SET_LOADING" });
    axios.get("/api/questions/get")
      .then( resp => dispatch({type: "GET_LIST", payload: resp.data}) )
      .catch(err => console.error(err));
  }

  return (
    <QuestionContext.Provider value={{ sendQuestion, questions: state.sendQuestion, getQuestions }}>{props.children}</QuestionContext.Provider>
  );
};

export default QuestionState;
