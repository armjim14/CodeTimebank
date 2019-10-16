import React, { Fragment, useContext, useState, useEffect } from "react";
import QuestionContext from "../Context/question/questionContext";
import { Link } from "react-router-dom";
import TimeContext from "../Context/time/timeContext";
import spinner from "./spinner.gif";

const Leaderboards = () => {
  const [state, setState] = useState({ users: [] });

  let { usersa } = state;

  const questionContext = useContext(QuestionContext);
  const { getAllUsers } = questionContext;

  const timeContext = useContext(TimeContext);
  const { forUser } = timeContext;

  const renderUsers = () => {
    if (!usersa || usersa.length === 0) {
      return (
        <tr>
          <td>No Data</td>
          <td>No Data</td>
          <td>No Data</td>
        </tr>
      );
    } else {
      return usersa.map(({ id, username, hours, hirable }) => {
        return (
          <tr key={id}>
            <td>
              <Link to={`/user/${id}`}>{username}</Link>
            </td>
            <td>{hours}</td>
            <td>
              {hirable === "true" ? (
                <i className='text-success fas fa-check-square' />
              ) : (
                <i className='text-rose fas fa-ban' />
              )}
            </td>
          </tr>
        );
      });
    }
  };

  useEffect(() => {
    async function fetchData() {
      let usersInfo = await getAllUsers();

      let everyUserTime = [];

      // console.log(usersInfo);

      for (let e in usersInfo) {
        let hourData = await forUser(usersInfo[e].id);
        // console.log(hourData);
        if (hourData.length > 0) {
          everyUserTime.push(hourData);
        }
      }

      let users = [];

      // console.log(everyUserTime);
      for (let i = 0; i < everyUserTime.length; i++) {
        let hours = everyUserTime[i].map(ar => ar.Time).reduce((a, b) => a + b);
        let id = everyUserTime[i][0].UserId;
        let username = everyUserTime[i][0].User.github;
        let hirable = everyUserTime[i][0].User.hirable;
        let ob = { hours, id, username, hirable };
        users.push(ob);
      }

      let run = true;

      // console.log(users);

      if (users.length > 0) {
        while (run) {
          run = false;
          for (let i = 0; i < users.length - 1; i++) {
            let j = i + 1;
            let num1 = users[i].hours;
            let num2 = users[j].hours;
            // console.log(num1);
            if (num1 < num2) {
              run = true;
              let tempA = users[i];
              let tempB = users[j];
              users[i] = tempB;
              users[j] = tempA;
            }
          }
        }
      }
      setState({ usersa: users });
    }
    fetchData();
    //eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <div className='row mb-3'>
        <div className='col-md-12 text-center my-3'>
          <h1>Leaderboard</h1>
        </div>
      </div>
      {!usersa ? (
        <div className='text-center'>
          <img src={spinner} alt='Loading...' className='img-fluid' />
        </div>
      ) : (
        <div className='row table-responsive mx-0'>
          <table style={{marginBottom: "65px"}} className='table table-stone table-striped table-bordered text-center shadow'>
            <thead>
              <tr className='thead-light'>
                <th>User</th>
                <th>Total Time Earned</th>
                <th>Hireable</th>
              </tr>
            </thead>
            <tbody>{renderUsers()}</tbody>
          </table>
        </div>
      )}
    </Fragment>
  );
};

export default Leaderboards;
