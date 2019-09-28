import React, { useReducer } from 'react';
import axios from 'axios';
import TimeContext from './timeContext';
import TimeReducer from './timeReducer';
// import types
import {} from '../types';

const TimeState = props => {
  const initialState = {};
  const [state, dispatch] = useReducer(TimeReducer, initialState);
  // time and/or app-related functions

  return (
    <TimeContext.Provider value={{}}>{props.children}</TimeContext.Provider>
  );
};

export default TimeState;
