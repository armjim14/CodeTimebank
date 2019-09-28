import React, { Fragment } from "react";

const Leaderboards = () => {
  return (
    <Fragment>
      <div className='row'>
        <div className='col-md-12 text-center'>
          <h1>Leaderboards</h1>
        </div>
      </div>
      <div className='row'>
        <table className='table table-bordered'>
          <thead>
            <tr className='thead-light'>
              <th>Username</th>
              <th>Total Time Earned</th>
              <th>Github Profile</th>
              <th>Hireable</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <a href='#!'>Example Username (Links to profile)</a>
              </td>
              <td>100</td>
              <td>
                <a
                  href='http://www.github.com/Mrrwmix'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  https://github.com/Mrrwmix
                </a>
              </td>
              <td>From Github API: render a checkmark if yes, X if no</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default Leaderboards;
