import React, { useContext, useState } from "react";
import alertContext from "../Context/alert/alertContext";
import questionContext from "../Context/question/questionContext";
import languages from "./data/languages";

function RequestHelp(props) {
  const QuestionContext = useContext(questionContext);
  const { sendQuestion } = QuestionContext;
  const AlertContext = useContext(alertContext);
  const { setAlert } = AlertContext;

  const [questionAsked, setQuestion] = useState({
    question: "",
    language: "",
    topic: "",
    repo: ""
  });

  const { question, language, topic, repo } = questionAsked;

  const onChange = e => {
    setQuestion({ ...questionAsked, [e.target.name]: e.target.value });
  };

  const submit = async e => {
    e.preventDefault();

    const res = await sendQuestion({ question, language, topic, repo });

    if (
      question === "" ||
      language === "" ||
      topic === "" ||
      res.status !== 200
    ) {
      setAlert("Fill in all fields correctly", "danger");
    } else {
      props.history.push("/dashboard");
    }
  };

  return (
    <div>
      <h1 style={{ marginTop: "90px" }} className='text-center'>
        Request Help
      </h1>
      <form onSubmit={submit}>
        <div className='row'>
          <div className='col-md-4'></div>
          <div className='form-group col-md-4 text-center'>
            <label htmlFor='topic font-weight-bold'>Topic: </label>
            <input
              onChange={onChange}
              value={topic}
              type='text'
              required
              name='topic'
              className='form-control text-center'
              placeholder="What's the general issue you're having?"
            />
          </div>
          <div className='col-md-4'></div>
          <div className='col-md-4'></div>
          <div className='form-group col-md-4 text-center'>
            <label htmlFor='language font-weight-bold'>Language: </label>
            <select
              onChange={onChange}
              required
              name='language'
              className='form-control text-center'
            >
              <option value=''>Select a language</option>
              {languages.map(language => (
                <option value={language.text} key={language.text}>
                  {language.text}
                </option>
              ))}
            </select>
          </div>
          <div className='col-md-4'></div>
        </div>
        <div className='row'>
          <div className='col-md-3'></div>
          <div className='form-group col-md-6 text-center'>
            <label htmlFor='question font-weight-bold'>Question:</label>
            <textarea
              onChange={onChange}
              value={question}
              required
              name='question'
              className='form-control'
              placeholder='Describe your problem in detail.'
              rows='5'
            />
          </div>
          <div className='col-md-3'></div>
        </div>

        <div className='row'>
          <div className='col-md-4'></div>
          <div className='form-group col-md-4 text-center'>
            <label htmlFor='repo font-weight-bold'>Github Repository:</label>
            <input
              type='text'
              value={repo}
              onChange={onChange}
              name='repo'
              className='form-control text-center'
              placeholder='Add a link to a Github Repository (Optional)'
            />
          </div>
          <div className='col-md-4'></div>
        </div>

        <div
          className='forButton d-flex justify-content-center mt-2'
          style={{ width: "100%" }}
        >
          <input className='btn btn-mariner text-white mb-5' type='submit' />
        </div>
      </form>
    </div>
  );
}

export default RequestHelp;
