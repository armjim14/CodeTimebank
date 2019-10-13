import React, { Fragment, useContext, useState, useEffect } from "react";
import QuestionContext from "../Context/question/questionContext";
import timeContext from "../Context/time/timeContext";
import AuthContext from "../Context/auth/authContext";
import AlertContext from "../Context/alert/alertContext";

function CreditForm(props) {
  const [{ users, helpers, person }, setState] = useState({
    users: [],
    helpers: [],
    person: ""
  });

  const questionContext = useContext(QuestionContext);
  const { getAllUsers } = questionContext;

  const authContext = useContext(AuthContext);
  const { getUsernames } = authContext;

  const TimeContext = useContext(timeContext);
  const { AddCredit } = TimeContext;

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const answeredQuestion = async e => {
    e.preventDefault();
    let temp = [];
    helpers.map(ar => temp.push(+ar.info.split("-").slice(0, 1).join("") ));
    console.log(temp);
    for (let i = 0; i < helpers.length; i++) {
      console.log("helpers at i is", helpers[i].hours);

      if (helpers[i].hours === 0) {
        return setAlert("Time helped must be greater than 0!", "danger");
      }
    }
    const resp = await AddCredit(temp, helpers, +props.match.params.id);
    // console.log(resp);
    if (resp) {
      setAlert("Question marked as solved and credit given", "success");
      props.history.push("/dashboard");

    }
  };

  const renderUsers = () => {
    if (!users || users.length === 0) {
      return <option value='none'>No users...</option>;
    } else {
      return users.map(({ id, github }) => {
        let both = `${id}-${github}`;
        return (
          <option key={id} value={both}>
            {github}
          </option>
        );
      });
    }
  };

  useEffect(() => {
    async function fetchData() {
      let { id } = await getUsernames();

      let users = await getAllUsers();

      let temp = [];

      for (let e in users) {
        if (users[e].id === id) {
          console.log("do nothing");
        } else {
          temp.push(users[e]);
        }
      }

      console.log(temp);
      setState({ users: temp });
    }
    fetchData();
    //eslint-disable-next-line
  }, []);

  const testing = e => {
    e.preventDefault();
    let ar = helpers;
    let num = e.target.value.split("-").slice(0, 1).join("");
    console.log(num)
    if (!isNaN(num)) {
      if (!ar) {
        ar = [{ info: e.target.value, hours: 0 }];
      } else {
        ar.push({ info: e.target.value, hours: 1 });
      }
    }
    console.log(ar)
    console.log(helpers)
    setState({ users, helpers: ar, person: e.target.value });
  };

  const changeHours = async ({ unique, i }, e) => {
    e.preventDefault();
    let value = e.target.value;
    console.log("I am here")
    for (let e in helpers) {
      if (+helpers[e].info.split("-").slice(0, 1).join("") === unique) {
        // let temp = helpers[e].info.split("");
        // temp[0] = await value.toString();
        let newHelpers = helpers;
        newHelpers[i].hours = +value;
        console.log(newHelpers);
        // let updatedInfo = {info: temp.join(""), hours: +value};
        // helpers.splice(i, 0);
        setState({
          users,
          person,
          helpers: newHelpers
        });
        console.log(helpers);
      }
    }
  };

  const getHelpers = () => {
    if (!helpers || helpers.length === 0) {
      return (
        <div className='col-md-12 text-center'>No users have been added</div>
      );
    }
    return helpers.map((bName, i) => {

      let aName = bName.info
        .split("-")
        .slice(1)
        .join("");
      let unique = +bName.info
        .split("-")
        .slice(0, 1)
        .join("");
      console.log(unique);
      console.log(aName);
      return (
        <Fragment key={i}>
          <div className='row mt-4'>
            <div className='col-md-6 text-right'>
              <h4 className='mr-1'>{aName}</h4>
            </div>
            <div className='col-md-6 text-left'>
              <input
                type='number'
                onChange={changeHours.bind(this, { unique, i })}
                className='form-control text-center'
                placeholder='Hour(s)'
                min='1'
                style={{ width: "6rem" }}
              />{" "}
            </div>
          </div>
        </Fragment>
      );
    });
  };

  return (
    <Fragment>
      <div style={{marginTop: "90px"}} className='row'>
        <div className='col-md-12'>
          <h1 className='text-center'>Credit Form</h1>
        </div>
      </div>
      <form onSubmit={answeredQuestion}>
        <div className='row'>
          <div className='col-md-12 text-center'>
            You may select multiple users
          </div>
        </div>
        <div className='row'>
          <div className='col-md-12 d-flex justify-content-center'>
            <select
              value={person}
              onChange={testing}
              className='dropdown-toggle form-control w-50'
            >
              <option value='none'>Select who helped you</option>
              {renderUsers()}
            </select>
          </div>
        </div>
        {getHelpers()}
        <div className='row mt-5'>
          <div className='col-md-12 d-flex justify-content-center'>
            <input type='submit' className='btn btn-block btn-greyish w-50' />
          </div>
        </div>
      </form>
    </Fragment>
  );
}

export default CreditForm;
