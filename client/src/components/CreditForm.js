import React, { Fragment, useContext, useState, useEffect } from "react";
import QuestionContext from "../Context/question/questionContext";
import timeContext from "../Context/time/timeContext";
import AuthContext from "../Context/auth/authContext";
import HelpOthers from "./HelpOthers";
import { getDefaultValues } from "apollo-utilities";

function CreditForm(props) {

    const [{ users, helpers, person }, setState] = useState({ users: [], helpers: [], person: "" })

    const questionContext = useContext(QuestionContext);
    const { getExceptUsers, getAllUsers } = questionContext;

    const authContext = useContext(AuthContext);
    const { getUsernames } = authContext;  

    const TimeContext = useContext(timeContext);
    const { AddCredit } = TimeContext;

    const answeredQuestion = e => {
        e.preventDefault();
        let temp = [];
        helpers.map(ar => temp.push(+ar.info[0]))
        console.log(temp)
        AddCredit(temp, helpers)
    }


    const renderUsers = () => {

        if (!users || users.length == 0) {
            return (
                <option value="none">No users...</option>
            );
        } else {
            return users.map(({ id, username }) => {
                let both = `${id}${username}`
                return (
                    <option key={id} value={both}>{username}</option>
                )
            })
        }

    }

    useEffect(() => {
        async function fetchData() {

            let { id } = await getUsernames();

            let users = await getAllUsers();

            let temp = []

            for (let e in users){
                if (users[e].id == id){
                    console.log("do nothing")
                } else {
                    temp.push(users[e])
                }
            }

            console.log(users)
            setState({ users: temp })

        }
        fetchData();
        //eslint-disable-next-line
    }, []);

    const testing = e => {
        e.preventDefault()
        let ar = helpers;
        let num = e.target.value[0];
        if (!isNaN(num)) {
            if (!ar) {
                ar = [{ info: e.target.value, hours: 1 }]
            } else {
                ar.push({ info: e.target.value, hours: 1 })
            }
        }
        setState({ users, helpers: ar, person: e.target.value })
    }

    const changeHours = async ({unique, i}, e) => {
        e.preventDefault();
        let value = e.target.value;
        for (let e in helpers) {
            if (+helpers[e].info[0] === unique) {
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
                })
                console.log(helpers)
            }
        }

    }

    const getHelpers = () => {
        if (!helpers || helpers.length === 0) {
            return <div className="col-md-12 text-center">No users have been added</div>
        }
        return helpers.map((bName, i) => {
            let aName = bName.info.split("").slice(1).join("")
            let unique = +bName.info.split("").slice(0, 1).join("");
            console.log(unique)
            console.log(aName);
            return (
                <Fragment key={i}>
                    <div className="col-md-6 text-center">
                        {aName}
                    </div>
                    <div className="col-md-6 text-center">
                        <input
                            type="number"
                            onChange={changeHours.bind(this, {unique, i})}
                            min="1"
                        /> Hours
                        </div>
                </Fragment>
            )
        })
    }

    return (
        <Fragment>
            <form onSubmit={answeredQuestion}>
                <select value={person} onChange={testing} type="button" className="btn btn-secondary text-white dropdown-toggle">
                    <option value="none">Select who helped you</option>
                    {renderUsers()}
                </select>
                <div className="row">
                    {getHelpers()}
                </div>
                <input type="submit" />
            </form>
        </Fragment>
    )
}

export default CreditForm
