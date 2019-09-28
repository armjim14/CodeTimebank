import React, { useReducer } from 'react';
import axios from 'axios';
import QuestionContext from './questionContext';
import QuestionReducer from './questionReducer';
// import types
import {} from '../types';

const TimeState = props => {
  const initialState = {};
  const [state, dispatch] = useReducer(QuestionReducer, initialState);
  // time and/or app-related functions

  return (
    <QuestionContext.Provider value={{}}>{props.children}</QuestionContext.Provider>
  );
};

export default TimeState;
