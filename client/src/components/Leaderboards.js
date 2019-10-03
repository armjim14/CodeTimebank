import React, { Fragment, useContext, useState, useEffect } from "react";
import QuestionContext from "../Context/question/questionContext";
import { Link } from "react-router-dom";


const Leaderboards = () => {

  const [state, setState] = useState({ users: [] })

  let { users } = state

  const questionContext = useContext(QuestionContext);
  const { getAllUsers } = questionContext;

  const renderUsers = () => {

    if (users.length == 0) {
      return (
        <tr>
          <td>No Data</td>
          <td>No Data</td>
          <td>No Data</td>
          <td>No Data</td>
        </tr>
      );
    } else {
      return users.map(({ id, username, github, credits }) => {
        return (
          <tr key={id}>
            <td><Link to="/">{username}</Link></td>
            <td>{credits}</td>
            <td><a href='https://www.github.com' target="__blank">{github}</a></td>
            <td>Hireable stuff</td>
          </tr>
        )
      })
    }

  }

  useEffect(() => {
    async function fetchData() {

      let users = await getAllUsers();
      console.log(users)
      setState({ users })

    }
    fetchData();
    //eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <div className='row'>
        <div className='col-md-12 text-center'>
          <h1>Leaderboards</h1>
        </div>
      </div>
      <div className='row'>
        <table className='table table-beige table-bordered'>
          <thead>
            <tr className='thead-light'>
              <th>Username</th>
              <th>Total Time Earned</th>
              <th>Github Profile</th>
              <th>Hireable</th>
            </tr>
          </thead>
          <tbody>
            {renderUsers()}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default Leaderboards;
