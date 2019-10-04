import React, { useContext, useState } from "react";
import alertContext from "../Context/alert/alertContext";
import questionContext from "../Context/question/questionContext";
import languages from "./data/languages";

function RequestHelp() {
  const QuestionContext = useContext(questionContext);
  const { sendQuestion } = QuestionContext;
  const AlertContext = useContext(alertContext);
  const { setAlert } = AlertContext;

  const [questionAsked, setQuestion] = useState({
    question: "",
    language: "",
    topic: ""
  });
  console.log(languages);

  const { question, language, topic } = questionAsked;

  const onChange = e =>
    setQuestion({ ...questionAsked, [e.target.name]: e.target.value });

  const submit = e => {
    e.preventDefault();

    console.log("I was clicked");

    if (question === "" || language === "" || topic === "") {
      setAlert("Fill in all fields", "danger");
    } else {
      sendQuestion({ question, language, topic });
    }
  };

  return (
    <div>
      <h1>What question are you wanting to ask</h1>
      <form onSubmit={submit}>
        <div className='row'>
          <div className='form-group col-md-6'>
            <label htmlFor='topic'>Topic: </label>
            <input
              onChange={onChange}
              value={topic}
              type='text'
              required
              name='topic'
              className='form-control'
              placeholder="What's the general issue you're having?"
            />
          </div>
          <div className='form-group col-md-6'>
            <label htmlFor='language'>Language: </label>
            <select
              onChange={onChange}
              required
              name='language'
              className='form-control'
            >
              <option value=''>Select a language</option>
              {languages.map(language => (
                <option value={language.name} key={language.name}>
                  {language.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className='form-group'>
          <label htmlFor='question'>Question:</label>
          <textarea
            onChange={onChange}
            value={question}
            required
            name='question'
            className='form-control'
            placeholder='Describe your issue in detail.'
            rows='5'
          />
        </div>
        <input type='submit' />
      </form>
    </div>
  );
}

export default RequestHelp;
