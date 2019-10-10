import React from "react";
import axios from "axios";
import QuestionContext from "./questionContext";

const QuestionState = props => {
  const sendQuestion = async formInfo => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    console.log(formInfo);

    try {
      const resp = await axios.post("/api/questions/add", formInfo, config);
      console.log(resp);
      return resp;
    } catch (e) {
      console.log("I am not working", e);
    }
  };

  const getQuestions = async lang => {
    try {
      const res = await axios.get(`/api/questions/help/${lang}`);
      console.log(res.data);
      return res.data;
    } catch (e) {
      console.log(e);
    }
  };

  const getUsersQuestions = async () => {
    try {
      const res = await axios.get(`/api/questions/userq`);
      // console.log("this is get user questions", res.data);
      return res.data;
    } catch (e) {
      console.log(e);
    }
  };

  const getAllUsers = async () => {
    try {
      const resp = await axios.get(`/api/users/50users`);
      console.log(resp.data);
      return resp.data;
    } catch (e) {
      console.log(e);
    }
  };

  const specificUser = async id => {
    console.log(id);
    try {
      const resp = await axios.get(`/api/users/${id}`);
      console.log(resp.data);
      return resp.data;
    } catch (e) {
      console.log(e);
    }
  };

  const specificQuestions = async id => {
    console.log(id);
    try {
      const resp = await axios.get(`/api/questions/${id}`);
      console.log(resp.data);
      return resp.data;
    } catch (e) {
      console.log(e);
    }
  };

  const deleteQuestions = id => {
    console.log(id);
    try {
      axios.delete(`/api/questions/delete/${id}`);
      console.log("it deleted");
      return "okay";
    } catch (e) {
      console.log(e)
    }
  };

  const forgotUser = async username => {
    try {
      const resp = await axios.get(`/api/users/forgot/${username}`)
      return resp.data;
    } catch(e) {
      console.log(e)
    }
  }

  const updatePassword = async userInfo => {
    try {
      console.log(userInfo);
      const resp = await axios.put(`/api/users/reset/password`, userInfo);
      return resp
    } catch(e) {
      console.log(e)
    }
  }

  return (
    <QuestionContext.Provider
      value={{
        sendQuestion,
        getUsersQuestions,
        getQuestions,
        getAllUsers,
        deleteQuestions,
        specificQuestions,
        forgotUser,
        updatePassword,
        specificUser
      }}
    >
      {props.children}
    </QuestionContext.Provider>
  );
};

export default QuestionState;
