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

    const AddCredit = async (ids, info, qId) => {
        let data = {ids, info, qId}
        const resp = axios.post("/api/time/test", data);
        console.log(resp.data);
        return resp.data;
    }

    const userCredit = async () => {
      let resp = await axios.get("/api/time/currentUser");
      console.log(resp.data);
      return resp.data;
    }

      
  return (
    <TimeContext.Provider
      value={{
        AddCredit,
        userCredit
      }}
    >
      {props.children}
    </TimeContext.Provider>
  );

}

export default TimeState;