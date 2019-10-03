import React, { useReducer } from 'react';
import axios from 'axios';
import QuestionContext from './questionContext';
import questionReducer from './questionReducer';
// import types
// import { } from '../types';

const QuestionState = props => {

    const initialState = {
      questions: [],
      userQuestions: [],
      loading: null
    };

  const [state, dispatch] = useReducer(questionReducer, initialState);

  const sendQuestion = async formInfo => {

    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    console.log(formInfo)

    try {
      const resp = await axios.post("/api/questions/add", formInfo, config);
      console.log(resp)
    } catch(e) {
      console.log("I am not working", e)
    }

  }

  const getQuestions = () => {
    dispatch({ type: "SET_LOADING" });
    return axios.get("/api/questions/get")
      .then( resp => dispatch({type: "GET_LIST", items: resp.data}) )
      // .then(resp => resp.data)
      .catch(err => console.error(err));
  }

  const getUsersQuestions = async () => {
    try {
      const res = await axios.get(`/api/questions/userq`);
      console.log(res.data);
      return res.data
    } catch (e){
      console.log(e)
    }
  } 

  return (
    <QuestionContext.Provider value={{ 
      sendQuestion,
      getUsersQuestions, 
      getQuestions, 
      questions: 
      state.questions,
      userQuestions: state.userQuestions,
      loading: state.loading }}>{props.children}</QuestionContext.Provider>
  );
};

export default QuestionState;
