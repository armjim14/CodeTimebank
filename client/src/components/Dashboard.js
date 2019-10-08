import React, { Fragment, useContext, useEffect, useState } from "react";
import AuthContext from "../Context/auth/authContext";
import QuestionContext from "../Context/question/questionContext";
import TimeContext from "../Context/time/timeContext";
import Stats from "./Stats";
import TimeGauge from "./TimeGauge";
import { Link } from "react-router-dom";
import Moment from "react-moment";


const Dashboard = props => {

  const [info, updateInfo] = useState({
    name: "",
    id: "",
    hours: 0,
    which: "unsolved",
    questions: []
  });

  const authContext = useContext(AuthContext);
  const { getUsernames } = authContext;

  const questionContext = useContext(QuestionContext);
  const { getUsersQuestions, deleteQuestions } = questionContext;

  const timeContext = useContext(TimeContext);
  const { userCredit } = timeContext;

  const getHours = () => {
    console.log(info.hours)
    if (info.hours) {
      return <span>{info.hours}</span>;
    } else {
      return <span>0</span>;
    }
  };

  const seeQuestions = () => {
    console.log(info.questions.length);

    if (info.questions.length === 0) {
      return (
        <div className='col-md-12 text-center'>There are no questions</div>
      );
    } else {
      console.log(info.questions);
      return info.questions.map(({ id, question, language, topic, solved, createdAt, repo }) => {
        if (info.which === "solved") {
          if (solved) {

            return (
              <div
                className='col-md-12 border border-dbrown rounded my-4 shadow'
                key={id}
              >
                <h3 className='text-center py-1 my-0'>{topic}</h3>
                <hr className='my-0' />
                <div className='row'>
                  <div className='col-md-6 pr-0'>
                    <p style={{ fontSize: "1.2rem" }} className='text-center border border-right p-1'>
                      Language: {language}
                    </p>
                  </div>
                  <div className='col-md-6 pl-0'>
                    <p style={{ fontSize: "1rem" }} className='text-center border border-left p-1'>
                      {" "}
                      <Moment tz='America/Phoenix' format='LLL Z'>
                        {createdAt}
                      </Moment>
                    </p>
                  </div>
                </div>
                <div className='row overflow-auto' style={{ height: "7rem", wordBreak: "break-all" }}>
                  <p style={{ fontSize: "1.2rem" }} className='col-md-12'>{question}</p>
                </div>

                <hr />
                {repo !== "" && (
                  <Fragment>
                    <div className='row'>
                      <div className='col-md-12 text-center text-dbrown'>
                        Github Repository: <a style={{ fontSize: "1rem" }} href={`${repo}`}>{repo}</a>
                      </div>
                    </div>
                    <hr />
                  </Fragment>
                )}

              </div>
            );

          }

        } else {

          if (!solved) {

            return (
              <div
                className='col-md-12 border border-dbrown rounded my-4 shadow'
                key={id}
              >
                <h3 className='text-center py-1 my-0'>
                  {topic}                  
                </h3>
                <h3 className="text-center py-1 my-0">
                  <i
                    style={{ cursor: "pointer" }}
                    className="text-danger mr-5 fas fa-trash-alt"
                    onClick={async () => {
                      deleteQuestions(id);
                      let dataBack = await getUsersQuestions();
                      updateInfo({
                        name: info.name,
                        id: info.id,
                        questions: dataBack,
                        hours: info.hours,
                        which: info.which
                      });
                    }}
                  >
                  </i>
                    <span 
                      className="text-success" 
                      style={{fontSize: "1rem", cursor: "pointer"}}
                      onClick={() => {
                        props.history.push(`/form/${id}`);
                      }}
                    >Solved?
                  <i
                    class="ml-2 text-success fas fa-check-square"
                    onClick={() => {
                      props.history.push(`/form/${id}`);
                    }}
                  >
                  </i>
                  </span>
                </h3>
      
                <hr className='my-0' />
                <div className='row'>
                  <div className='col-md-6 pr-0'>
                    <p style={{ fontSize: "1rem" }} className='text-center border border-right p-1'>
                      Language: {language}
                    </p>
                  </div>
                  <div className='col-md-6 pl-0'>
                    <p style={{ fontSize: "1rem" }} className='text-center border border-left p-1'>
                      {" "}
                      <Moment tz='America/Phoenix' format='LLL Z'>
                        {createdAt}
                      </Moment>
                    </p>
                  </div>
                </div>
                <div className='row overflow-auto' style={{ height: "7rem", wordBreak: "break-all" }}>
                  <p style={{ fontSize: "1.2rem" }} className='col-md-12'>{question}</p>
                </div>

                <hr />
                {repo !== "" && (
                  <Fragment>
                    <div className='row'>
                      <div className='col-md-12 text-center text-dbrown'>
                        Github Repository: <a style={{ fontSize: "1rem" }} href={`${repo}`}>{repo}</a>
                      </div>
                    </div>
                    <hr />
                  </Fragment>
                )}

              </div>
            );


          }

        }
      });
    }
  };

  useEffect(() => {
    async function fetchData() {
      let hoursData = await userCredit();
      let dataBack = await getUsersQuestions();
      console.log(dataBack);
      let { github, id } = await getUsernames();

      if (hoursData.length > 1) {
        console.log(hoursData)
        console.log(hoursData.map(ar => ar.Time))
        let totalHours = hoursData.map(ar => ar.Time).reduce((a, b) => a + b)
        console.log(totalHours)

        updateInfo({
          name: github,
          id,
          questions: dataBack,
          hours: totalHours,
          which: info.which
        });
      } else if (hoursData.length === 1) {
        console.log(hoursData);
        updateInfo({
          name: github,
          id,
          questions: dataBack,
          hours: hoursData[0].Time,
          which: info.which
        });
      } else {
        updateInfo({
          name: github,
          id,
          questions: dataBack,
          hours: info.hours,
          which: info.which
        });
      }
    }
    fetchData();
    //eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <div className='row'>
        <div className='col-md-12'>
          <h1 className='text-center text-black'>Dashboard</h1>
        </div>
      </div>

      <div className='row d-flex justify-content-center mt-3'>
        <div className='col-md-3'>
          <button
            onClick={() => {
              props.history.push(`/user/${info.id}`);
            }}
            className='btn btn-block btn-beige rounded-pill'
          >
            View Profile
          </button>
        </div>
        <div className='col-md-3'>
          <button
            onClick={() => {
              props.history.push(`/editprofile`);
            }}
            className='btn btn-block btn-greyish rounded-pill'
          >
            Edit Contact Info
          </button>
        </div>
        <div className='col-md-3'>
          <button
            onClick={() => {
              props.history.push(`/changepassword`);
            }}
            className='btn btn-block btn-beige rounded-pill'
          >
            Change Password
          </button>
        </div>
      </div>

      <div className='row mt-4'>
        <div className='col-md-12'>
          <h1 className='text-center'>Hello, {info.name}</h1>
        </div>
      </div>

      <div className='row mt-4'>
        {/* <div className='col-md-6'>
          <Stats />
        </div> */}
        <div className='col-md-12 d-flex justify-content-center'>
          <TimeGauge hours={info.hours} />
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-12">
          <h2 style={style.vert} className='text-center'>
            Credits: {getHours()}
          </h2>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-6 d-flex justify-content-center pl-5">
          <button
            className="btn btn-outline-danger ml-5"
            onClick={() => {
              updateInfo({
                name: info.name,
                id: info.id,
                questions: info.questions,
                hours: info.hours,
                which: "unsolved"
              });
            }}
          >
            Unsolved
          </button>
        </div>
        <div className="col-md-6 d-flex justify-content-center pr-5">
          <button
            className="btn btn-outline-success mr-5"
            onClick={() => {
              updateInfo({
                name: info.name,
                id: info.id,
                questions: info.questions,
                hours: info.hours,
                which: "solved"
              });
            }}
          >
            Solved
          </button>
        </div>
      </div>

      <div className='row mb-5'>{seeQuestions()}</div>
    </Fragment>
  );
};

const style = {
  vert: {
    marginTop: "50px",
    // fontSize: "20px",
    fontWeight: "bold"
  }
};

export default Dashboard;

{/* <button
onClick={async () => {
  deleteQuestions(id);
  let dataBack = await getUsersQuestions();
  updateInfo({
    name: info.name,
    id: info.id,
    questions: dataBack,
    hours: info.hours,
    which: info.which
  });

}}
>
Delete Questions
</button>
<button
onClick={() => {
  props.history.push(`/form/${id}`);
}}
>
Mark as resolved
</button> */}
