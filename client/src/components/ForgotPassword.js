import React, { useState, useContext } from 'react';
import QuestionContext from '../Context/question/questionContext';
import AlertContext from "../Context/alert/alertContext";

function ForgotPassword(props) {

    const [all, setUser] = useState({
        user: "",
        securityAnswer: "",
        userExist: false,
        sAnswered: false,
        userInfo: [],
        passwordOne: "",
        passwordTwo: ""
    })

    let { user, securityAnswer, userExist, sAnswered, userInfo, passwordOne, passwordTwo } = setUser;

    const onChange = e => setUser({ ...all, [e.target.name]: e.target.value })

    const questionContext = useContext(QuestionContext);
    const { forgotUser, updatePassword } = questionContext;

    const alertContext = useContext(AlertContext);
    const { setAlert } = alertContext;  

    const findUser = async () => {
        console.log(all.user)
        let userBack = await forgotUser(all.user)
        if (userBack) {
            setUser({
                user: "",
                securityAnswer,
                userExist: true,
                sAnswered: false,
                userInfo: userBack,
                passwordOne,
                passwordTwo
            })
        } else {
            setAlert("No User Found", "danger")
        }
    }

    const checkPasswords = async () => {
        if (all.passwordOne === all.passwordTwo){
            const resp = await updatePassword({id: all.userInfo.id, password: all.passwordOne, email: all.userInfo.username, github: all.userInfo.github});
            console.log(resp)
            if (resp.status === 200){
                setAlert("Passwords updated", "success")
                props.history.push("/login")
            }
        } else {
            setAlert("Passwords do not match", "danger")
        }
    }

    const checkAnswer = () => {
        console.log(all.securityAnswer)
        if (all.securityAnswer === all.userInfo.securityAnswer) {
            setUser({
                user: "",
                securityAnswer: "",
                userExist: true,
                sAnswered: true,
                userInfo: all.userInfo,
                passwordOne,
                passwordTwo
            })
        } else {
            setAlert("Incorrect Answer", "danger")
        }
    }

    const whichOne = () => {
        if (!all.userExist) {
            return (
                <div className='fullWidth d-flex justify-content-center'>
                    <div className="loginStuff">
                        <label htmlFor='username' className='col-md-12 col-form-label font-weight-bold' >
                            Enter your Email:
                    </label>

                        <input
                            type='email'
                            name='user'
                            onChange={onChange}
                            className='form-control inputStuff mb-3 mr-0'
                            placeholder='Your Email'
                            value={user}
                        />

                        <div className="forButton d-flex justify-content-center mt-4" style={{ width: "100%" }}>
                            <button className='btn btn-primary btn-greyish' onClick={findUser}>
                                Submit
                        </button>
                        </div>
                    </div>
                </div>
            )
        } else if (!all.sAnswered) {
            console.log(all.userInfo.securityQuestion);
            return (
                <div className="col-md-12 mt-4">
                    <p style={{ fontSize: "1.5rem" }} className="text-center"><b>Security Question:</b> {all.userInfo.securityQuestion}?</p>
                    <input
                        type="text"
                        name="securityAnswer"
                        value={securityAnswer}
                        className='form-control inputStuff mb-3 mr-0'
                        onChange={onChange}
                        placeholder="Security Answer"
                    />
                    <div className="forButton d-flex justify-content-center mt-4" style={{ width: "100%" }}>
                        <button className='btn btn-primary btn-greyish' onClick={checkAnswer}>
                            Submit
                        </button>
                    </div>

                </div>
            )
        } else {
            return (
                <div className='fullWidth d-flex justify-content-center'>
                    <div className="loginStuff">

                        <label htmlFor='username' className='col-md-12 col-form-label font-weight-bold' >
                            Enter a new password:
                        </label>
                        <input
                            type='password'
                            name='passwordOne'
                            onChange={onChange}
                            className='form-control inputStuff mb-3 mr-0'
                            placeholder='Password'
                            value={passwordOne}
                        />

                        <label htmlFor='username' className='col-md-12 col-form-label font-weight-bold' >
                            Enter new password again:
                        </label>
                        <input
                            type='password'
                            name='passwordTwo'
                            onChange={onChange}
                            className='form-control inputStuff mb-3 mr-0'
                            placeholder='Password again'
                            value={passwordTwo}
                        />

                        <div className="forButton d-flex justify-content-center mt-4" style={{ width: "100%" }}>
                            <button className='btn btn-primary btn-greyish' onClick={checkPasswords}>
                                Submit
                        </button>
                        </div>
                    </div>
                </div>
            )
        }
    }

    return (
        <div className="row">
            <div className="col-md-12 mt-3 mb-3">
                <h1 className="text-center">Forgot Password</h1>
                {whichOne()}
            </div>
        </div>
    )
}

export default ForgotPassword
