import React, { Fragment, useContext, useState, useEffect } from "react";
import QuestionContext from "../Context/question/questionContext";
import timeContext from "../Context/time/timeContext";
import HelpOthers from "./HelpOthers";

function CreditForm(props) {

    const [{users, helpers, person}, setState] = useState({ users: [], helpers: [], person: "" })

    const questionContext = useContext(QuestionContext);
    const { getAllUsers } = questionContext;

    const TimeContext = useContext(timeContext);
    const { AddCredit } = TimeContext;  

    const answeredQuestion = () => {
        console.log(helpers)
        AddCredit(helpers, 1)
      }
    

    const renderUsers = () => {

        if (!users || users.length == 0) {
          return (
            <option value="none">No users...</option>
          );
        } else {
          return users.map(({ id, username }) => {
            return (
                <option key={id} value={id}>{username}</option>
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

        const testing = e => {
            e.preventDefault()
            let ar = helpers;
            if (!isNaN(e.target.value)){
                if (!ar){
                    ar = [+e.target.value]
                } else {
                    ar.push(+e.target.value)
                }
            }
            setState({users, helpers: ar, person: e.target.value})
          }
        
        const getHelpers = () => {
            if (!helpers || helpers.length == 0){
                return <p className="text-center">No users added</p>
            } 
            return helpers.map( (name, i) => {
                <div key={i}>
                    {name}
                </div>
            })
        }

    return (
        <Fragment>
            <form onSubmit={answeredQuestion}>
                <select value={person} onChange={testing} type="button" className="btn btn-secondary text-white dropdown-toggle">
                    <option value="none">Select who helped you</option>
                    {renderUsers()}
                </select>
                <input type="submit" />
            </form>
            <div className="row">
                <div className="col-md-12">
                    {getHelpers()}
                </div>
            </div>
        </Fragment>
    )
}

export default CreditForm
