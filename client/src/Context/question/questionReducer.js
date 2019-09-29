import { } from '../types';
// import { start } from 'repl';

export default (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        loading: true
      };
    case "GET_LIST":
      return {
        ...state,
        questions: [...action.payload],
        loading: false
      }
    default:
      return state;
  }
};
