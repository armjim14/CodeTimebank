// import { } from '../types';

export default (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        loading: true
      }
    case "GET_LIST":
      return {
        ...state,
        questions: [...state.questions, action.items],
        loading: false
      }
    default:
      return state;
  }
};
