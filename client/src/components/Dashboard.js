import React, { useContext, useState } from "react";
import QuestionContext from "../Context/question/questionContext";

const Dashboard = () => {

  const QuestionContext = useContext(QuestionContext);
  const { sendQuestion } = QuestionContext;

  const [questionAsked, setUser] = useState({
    question: "",
    language: "",
    comfort: ""
  });

  const { question, language, comfort } = questionAsked;

  const onChange = e => setUser({ ...questionAsked, [e.target.name]: e.target.value });

  const submit = e => {
    e.preventDefault();

    console.log("stuff")
  }

  return (
    <div>
      <h1>What question do you have in mind</h1>
      <form onSubmit={submit}>
        <input type="text" required name="question" />
        <input type="text" required name="language" />
        <input type="text" required name="comfort" />
        <input type="submit" />
      </form>
    </div>
  );
};

export default Dashboard;
