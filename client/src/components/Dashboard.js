import React, { Fragment, useContext, useEffect, useState } from "react";
import AuthContext from "../Context/auth/authContext";
import QuestionContext from "../Context/question/questionContext";
import TimeContext from "../Context/time/timeContext";
import TimeGauge from "./TimeGauge";
import Moment from "react-moment";
import AlertContext from "../Context/alert/alertContext";

const Dashboard = props => {
  const [info, updateInfo] = useState({
    name: "",
    id: "",
    hours: 0,
    which: "unsolved",
    questions: [],
    isAdmin: false,
    adminArr: [],
    adminNames: []
  });

  const authContext = useContext(AuthContext);
  const { getUsernames, getGithubInfo } = authContext;

  const questionContext = useContext(QuestionContext);
  const { getUsersQuestions, deleteQuestions, getAllUsers } = questionContext;

  const timeContext = useContext(TimeContext);
  const { userCredit, allUsers, adjustTime } = timeContext;

  const { isAdmin, adminArr, adminNames } = info;
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const creditSubmit = async e => {
    e.preventDefault();
    if (e.target.previousSibling.value == 0) {
      setAlert("Please input a positive or negative value", "rose");
    } else {
      const resp = await adjustTime(
        e.target.previousSibling.value,
        e.target.getAttribute("userid")
      );
      // console.log(resp);
      if (resp.status === 200) {
        setAlert(`Adjustment successful!`, "jgreen");
        window.location.reload();
      } else {
        setAlert(`Adjustment failed!`, `rose`);
      }
    }
  };

  const getHours = () => {
    // console.log(info.hours);
    if (info.hours) {
      return <span>{info.hours}</span>;
    } else {
      return <span>0</span>;
    }
  };

  const seeQuestions = () => {
    if (info.questions.length === 0) {
      return (
        <div className='col-md-12 text-center'>There are no questions</div>
      );
    } else {
      // console.log(info.questions);
      return info.questions.map(
        //eslint-disable-next-line
        ({ id, question, language, topic, solved, createdAt, repo }) => {
          if (info.which === "solved") {
            if (solved) {
              return (
                <div
                  style={{padding: "0 15px 0 15px"}}
                  className='queslen border border-dbrown rounded my-4 shadow'
                  key={id}
                >
                  <h3 className='text-center py-1 my-0'>{topic}</h3>
                  <hr className='my-0' />
                  <div className='row'>
                    <div className='col-md-6 pr-0'>
                      <p
                        style={{ fontSize: "1.2rem" }}
                        className='text-center border border-right p-1'
                      >
                        Language: {language}
                      </p>
                    </div>
                    <div className='col-md-6 pl-0'>
                      <p
                        style={{ fontSize: "1rem" }}
                        className='text-center border border-left p-1'
                      >
                        {" "}
                        <Moment tz='America/Phoenix' format='LLL Z'>
                          {createdAt}
                        </Moment>
                      </p>
                    </div>
                  </div>
                  <div
                    className='row overflow-hidden'
                    style={{ height: "7rem", wordBreak: "break-all" }}
                  >
                    <p style={{ fontSize: "1.2rem" }} className='col-md-12'>
                      {question}
                    </p>
                  </div>
                  <div className='col-md-12 d-flex justify-content-around'>
                    <button
                      className='btn btn-outline-glacier'
                      onClick={ChangeHeight}
                    >
                      See More
                    </button>
                  </div>

                  <hr />
                  {repo !== "" && (
                    <Fragment>
                      <div className='row'>
                        <div className='col-md-12 text-center text-dbrown'>
                          Github Repository:{" "}
                          <a style={{ fontSize: "1rem", wordBreak: "break-all" }} href={`${repo}`}>
                            {repo}
                          </a>
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
                  style={{padding: "0 15px 0 15px"}}
                  className='queslen border border-dbrown rounded my-4 shadow'
                  key={id}
                >
                  <div className='row'>
                    <div className='col-md-4'></div>
                    <div className='col-md-4'>
                      <h3 className='text-center pt-1 my-0'>{topic} </h3>
                    </div>
                    <div className='col-md-4 text-right pr-5 py-3'>
                      <i
                        onClick={changeModal.bind(this, id)}
                        style={{ fontSize: "1.2rem", cursor: "pointer" }}
                        className='text-right fas fa-ellipsis-v'
                      ></i>
                    </div>
                  </div>
                  {forModal(id, topic)}
                  <hr className='my-0' />
                  <div className='row'>
                    <div className='col-md-6 pr-0'>
                      <p
                        style={{ fontSize: "1rem" }}
                        className='text-center border border-right p-1'
                      >
                        Language: {language}
                      </p>
                    </div>
                    <div className='col-md-6 pl-0'>
                      <p
                        style={{ fontSize: "1rem" }}
                        className='text-center border border-left p-1'
                      >
                        {" "}
                        <Moment tz='America/Phoenix' format='LLL Z'>
                          {createdAt}
                        </Moment>
                      </p>
                    </div>
                  </div>
                  <div
                    className='row overflow-hidden'
                    style={{ height: "7rem", wordBreak: "break-all" }}
                  >
                    <p style={{ fontSize: "1.2rem" }} className='col-md-12'>
                      {question}
                    </p>
                  </div>

                  <div className='col-md-12 d-flex justify-content-around'>
                    <button
                      className='btn btn-outline-glacier'
                      onClick={ChangeHeight}
                    >
                      See More
                    </button>
                  </div>

                  <hr />
                  {repo !== "" && (
                    <Fragment>
                      <div className='row'>
                        <div className='col-md-12 text-center text-dbrown'>
                          Github Repository:{" "}
                          <a style={{ fontSize: "1rem", wordBreak: "break-all" }} href={`${repo}`}>
                            {repo}
                          </a>
                        </div>
                      </div>
                      <hr />
                    </Fragment>
                  )}
                </div>
              );
            }
          }
        }
      );
    }
  };

  const ChangeHeight = e => {
    e.preventDefault();

    if (e.target.parentNode.previousSibling.style.height === "7rem") {
      e.target.parentNode.previousSibling.style.height = "auto";
      e.target.innerText = "See Less";
    } else {
      e.target.parentNode.previousSibling.style.height = "7rem";
      e.target.innerText = "See More";
    }
  };

  const changeModal = (id, e) => {
    e.target.parentNode.parentNode.nextSibling.style.display = "block";
  };

  const forModal = (id, topic) => {
    return (
      <div className='modal'>
        <div className='modal-content'>
          <span onClick={closeModal} className='close text-right'>
            &times;
          </span>
          <div className='row mb-3'>
            <div className='col-md-12'>
              <p
                style={{ fontSize: "2rem", fontWeight: "bold" }}
                className='text-center'
              >
                {topic}
              </p>
            </div>
            <div className='col-md-6 text-center mb-3'>
              <span
                className='text-center text-success'
                style={{ fontSize: "1.5rem", cursor: "pointer" }}
                onClick={() => {
                  props.history.push(`/form/${id}`);
                }}
              >
                Solved
                <i
                  className='ml-2 text-success fas fa-check-square'
                  onClick={() => {
                    props.history.push(`/form/${id}`);
                  }}
                ></i>
              </span>
            </div>
            <div className='col-md-6 text-center'>
              <i
                style={{ fontSize: "1.5rem", cursor: "pointer" }}
                className='px-2 py-2 text-center text-danger fas fa-trash-alt'
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
              ></i>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const closeModal = e => {
    e.target.parentNode.parentNode.style.display = "none";
  };

  useEffect(() => {
    async function fetchData() {
      let hoursData = await userCredit();
      let dataBack = await getUsersQuestions();
      let { github, id, isAdmin } = await getUsernames();
      getGithubInfo();

      if (hoursData.length > 1) {
        let totalHours = hoursData.map(ar => ar.Time).reduce((a, b) => a + b);

        updateInfo({
          name: github,
          id,
          questions: dataBack,
          hours: totalHours,
          which: info.which,
          isAdmin,
          adminArr: info.adminArr,
          adminNames: info.adminNames
        });
      } else if (hoursData.length === 1) {
        // console.log(hoursData);
        updateInfo({
          name: github,
          id,
          questions: dataBack,
          hours: hoursData[0].Time,
          which: info.which,
          isAdmin,
          adminArr: info.adminArr,
          adminNames: info.adminNames
        });
      } else {
        updateInfo({
          name: github,
          id,
          questions: dataBack,
          hours: info.hours,
          which: info.which,
          isAdmin,
          adminArr: info.adminArr,
          adminNames: info.adminNames
        });
      }
      if (isAdmin) {
        const resp = await allUsers();
        const resp2 = await getAllUsers();
        console.log(`admin resp`, resp);
        updateInfo({
          name: github,
          id,
          questions: dataBack,
          hours: info.hours,
          which: info.which,
          isAdmin,
          adminArr: resp,
          adminNames: resp2
        });
      }
    }
    fetchData();
    //eslint-disable-next-line
  }, [info.questions]);

  return (
    <Fragment>
      <div style={{marginTop: "90px"}} className='row'>
        <div className='col-md-12'>
          <h1 className='text-center text-black'>Dashboard</h1>
        </div>
      </div>

      <div className='row mt-3'>
        <div className='col-md-4 d-flex justify-content-center'>
          <button
            onClick={() => {
              props.history.push(`/user/${info.id}`);
            }}
            id='ButtonMargin'
            className='btn btn-stone rounded-pill'
          >
            View Your Profile
          </button>
        </div>
        <div className='col-md-4 d-flex justify-content-center'>
          <button
            onClick={() => {
              props.history.push(`/editprofile`);
            }}
            id='ButtonMargin'
            className='btn btn-stone rounded-pill'
          >
            Edit Contact Info
          </button>
        </div>
        <div className='col-md-4 d-flex justify-content-center'>
          <button
            onClick={() => {
              props.history.push(`/changepassword`);
            }}
            className='btn btn-stone rounded-pill'
          >
            Change Password
          </button>
        </div>
      </div>

      <div className='row mt-4'>
        <div className='col-md-12'>
          <h1 className='text-center'>{info.name}</h1>
        </div>
      </div>

      {isAdmin ? (
        <div className='row mt-4'>
          <div className='col-md-12'>
            <h1 className='text-center text-jgreen'>Adjust Credits</h1>
            <hr />
          </div>
          <div className='col-md-12 d-flex flex-wrap justify-content-center mb-5'>
            {adminNames.map(row => {
              return (
                <div className='col-md-3 m-1' key={row.id}>
                  <div className='bg-cello border border-fjord rounded'>
                    <div className='p-3'>
                      <h5 className='card-title text-center text-athens'>
                        {row.username}
                      </h5>
                      <form className='form-group'>
                        <input
                          type='number'
                          className='form-control mb-2 text-center'
                          placeholder='Add/subtract credits'
                        />
                        <button
                          className='btn-rose btn-block rounded'
                          onClick={creditSubmit}
                          userid={row.id}
                          type='submit'
                        >
                          Change Credits
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className='col-md-12'>
            <h1 className='text-center text-jgreen'>Credit History</h1>
            <hr />
          </div>
          <div className='col-md-12'>
            <div className='table-responsive'>
              <table className='table table-bordered table-hover'>
                <thead className='thead mb-5 bg-cello text-athens'>
                  <tr>
                    <th scope='col'>Username</th>
                    <th scope='col'>Question Topic</th>
                    <th scope='col'>Credits Added/Lost</th>
                    <th scope='col'>Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {adminArr
                    .sort((a, b) => b.id - a.id)
                    .map(row => {
                      return (
                        <tr key={row.id}>
                          <td scope='row'>{row.User.username}</td>
                          {row.question ? (
                            <td>{row.question.topic}</td>
                          ) : (
                            <td>
                              <strong>Admin adjustment</strong>
                            </td>
                          )}
                          <td>{row.Time}</td>
                          <td>
                            <Moment tz='America/Phoenix' format='LLL Z'>
                              {row.createdAt}
                            </Moment>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <Fragment>
          <div className='row mt-4'>
            <div className='col-md-12 d-flex justify-content-center'>
              {info.hours > 0 || info.hours < 0 ? (
                <TimeGauge hours={info.hours} />
              ) : (
                <p className='text-center'>
                  Get to asking and answering questions!
                </p>
              )}
            </div>
          </div>

          <div className='row mb-4'>
            <div className='col-md-12'>
              <h2 style={style.vert} className='text-center'>
                Credits: {getHours()}
              </h2>
            </div>
          </div>

          <hr />

          <div className='row mb-4'>
            <div className='col-md-12 text-center'>
              <h2 className='font-weight-bold'>Question History</h2>
            </div>
          </div>

          <div className='row mb-2'>
            <div className='col-md-6 d-flex justify-content-center mb-2'>
              <button
                className='btn btn-rose'
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
            <div className='col-md-6 d-flex justify-content-center mb-2'>
              <button
                className='btn btn-jgreen'
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
      )}
    </Fragment>
  );
};

const style = {
  vert: {
    marginTop: "50px",
    fontWeight: "bold"
  }
};

export default Dashboard;
