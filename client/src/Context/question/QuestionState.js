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

  const getQuestions = async (lang) => {
    try {
      const res = await axios.get(`/api/questions/help/${lang}`);
      console.log(res.data);
      return res.data
    } catch (e){
      console.log(e)
    }
  }
// `/api/questions/help/${lang}`
  const getUsersQuestions = async () => {
    try {
      const res = await axios.get(`/api/questions/userq`);
      console.log(res.data);
      return res.data
    } catch (e){
      console.log(e)
    }
  } 

  const getAllUsers = async () => {
    try {
      const resp = await axios.get(`/api/users/50users`);
      console.log(resp.data);
      return resp.data
    } catch (e){
      console.log(e)
    }
  }

  const specificUser = async id => {
    console.log(id)
    try {
      const resp = await axios.get(`/api/users/${id}`);
      console.log(resp.data);
      return resp.data
    } catch (e) {
      console.log(e)
    }
  }

  const specificQuestions = async id => {
    console.log(id)
    try {
      const resp = await axios.get(`/api/questions/${id}`);
      console.log(resp.data);
      return resp.data
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <QuestionContext.Provider value={{ 
      sendQuestion,
      getUsersQuestions, 
      getQuestions,
      getAllUsers,
      specificQuestions,
      specificUser,
      questions: state.questions,
      userQuestions: state.userQuestions,
      loading: state.loading }}>{props.children}</QuestionContext.Provider>
  );
};

export default QuestionState;
