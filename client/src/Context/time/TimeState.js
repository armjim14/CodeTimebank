import React from "react";
import axios from "axios";
import TimeContext from "./timeContext";

const TimeState = props => {
  const AddCredit = async (ids, info, qId) => {
    let data = { ids, info, qId };
    const resp = await axios.post("/api/time/test", data);
    console.log(resp);
    return resp.data;
  };

  const userCredit = async () => {
    let resp = await axios.get("/api/time/currentUser");
    // console.log(resp.data);
    return resp.data;
  };

  const forUser = async id => {
    let resp = await axios.get(`/api/time/user/${id}`);
    console.log("This is time/user/id", resp);
    return resp.data;
  };

  return (
    <TimeContext.Provider
      value={{
        AddCredit,
        userCredit,
        forUser
      }}
    >
      {props.children}
    </TimeContext.Provider>
  );
};

export default TimeState;
