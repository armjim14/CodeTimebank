import { } from '../types';
// import { start } from 'repl';

export default (state, action) => {
  switch (action.type) {
    case "GET_LIST":
      return {
        questions: [...action.items]
      }
    default:
      return state;
  }
};
