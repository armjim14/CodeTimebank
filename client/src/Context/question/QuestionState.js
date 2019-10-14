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

    // console.log(formInfo);

    try {
      const resp = await axios.post("/api/questions/add", formInfo, config);
      // console.log(resp);
      return resp;
    } catch (e) {
      console.log("I am not working", e);
    }
  };

  const getQuestions = async lang => {
    try {
      if (lang === "C#") {
        lang = "Csharp";
      }
      const res = await axios.get(`/api/questions/help/${lang}`);
      // console.log(res.data);
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
      // console.log(resp.data);
      return resp.data;
    } catch (e) {
      console.log(e);
    }
  };

  const specificUser = async id => {
    // console.log(id);
    try {
      const resp = await axios.get(`/api/users/${id}`);
      // console.log(resp.data);
      return resp.data;
    } catch (e) {
      console.log(e);
    }
  };

  const specificQuestions = async id => {
    // console.log(id);
    try {
      const resp = await axios.get(`/api/questions/${id}`);
      // console.log(resp.data);
      return resp.data;
    } catch (e) {
      console.log(e);
    }
  };

  const deleteQuestions = id => {
    // console.log(id);
    try {
      axios.delete(`/api/questions/delete/${id}`);
      // console.log("it deleted");
      return "okay";
    } catch (e) {
      console.log(e);
    }
  };

  const forgotUser = async username => {
    try {
      const resp = await axios.get(`/api/users/forgot/${username}`);
      return resp.data;
    } catch (e) {
      console.log(e);
    }
  };

  const updatePassword = async userInfo => {
    try {
      // console.log(userInfo);
      const resp = await axios.put(`/api/users/reset/password`, userInfo);
      return resp;
    } catch (e) {
      console.log(e);
    }
  };

  const wordCloudQuestions = async () => {
    let initArr = [
      {
        text: "JavaScript",
        value: 0
      },
      {
        text: "CSS",
        value: 0
      },
      {
        text: "HTML",
        value: 0
      },
      {
        text: "C#",
        value: 0
      },
      {
        text: "C++",
        value: 0
      },
      {
        text: "C",
        value: 0
      },
      {
        text: "Java",
        value: 0
      },
      {
        text: "PHP",
        value: 0
      },
      {
        text: "Python",
        value: 0
      },
      {
        text: "Ruby",
        value: 0
      },
      {
        text: "Perl",
        value: 0
      },
      {
        text: "SQL",
        value: 0
      },
      {
        text: "NOSQL",
        value: 0
      },
      {
        text: "Other",
        value: 0
      }
    ];
    try {
      const resp = await axios.get(`/api/questions/get`);
      // console.log(`word cloud question response is`, resp);
      for (let i = 0; i < resp.data.length; i++) {
        if (!resp.data[i].solved) {
          console.log(resp.data[i].solved);
          switch (resp.data[i].language) {
            case "JavaScript":
              initArr[0].value++;
              break;
            case "CSS":
              // console.log(resp.data[i].solved);
              initArr[1].value++;
              break;
            case "HTML":
              initArr[2].value++;
              break;
            case "C#":
              initArr[3].value++;
              break;
            case "C++":
              initArr[4].value++;
              break;
            case "C":
              initArr[5].value++;
              break;
            case "Java":
              initArr[6].value++;
              break;
            case "PHP":
              initArr[7].value++;
              break;
            case "Python":
              initArr[8].value++;
              break;
            case "Ruby":
              initArr[9].value++;
              break;
            case "Perl":
              initArr[10].value++;
              break;
            case "SQL":
              initArr[11].value++;
              break;
            case "NoSQL":
              initArr[12].value++;
              break;
            default:
              initArr[13].value++;
              break;
          }
        }
      }
      // console.log(initArr);
      return initArr;
    } catch (e) {
      console.log(e);
    }
  };

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
        specificUser,
        wordCloudQuestions
      }}
    >
      {props.children}
    </QuestionContext.Provider>
  );
};

export default QuestionState;
