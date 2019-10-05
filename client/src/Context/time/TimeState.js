import React, { useReducer } from "react";
import axios from "axios";
import TimeContext from "./timeContext";
import timeReducer from "./timeReducer";

const TimeState = props => {

    const initialState = {
      questions: [],
      userQuestions: [],
      loading: null
    };
    
    const [state, dispatch] = useReducer(timeReducer, initialState);

    const AddCredit = async (ids, info) => {
        let data = {ids, info}
        const resp = axios.post("/api/time/test", data);
        console.log(resp.data);
        return resp.data;
    }

      
  return (
    <TimeContext.Provider
      value={{
        AddCredit
      }}
    >
      {props.children}
    </TimeContext.Provider>
  );

}

export default TimeState;