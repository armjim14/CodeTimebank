import React from 'react'

function ForgotPassword() {
    return (
        <div className="row">
            <div className="col-md-12 mt-3 mb-3">
                <h1 className="text-center">Forgot Password</h1>
            </div>
            <div className='fullWidth d-flex justify-content-center'>
                <div className="loginStuff">
                    <label htmlFor='username' className='col-md-12 col-form-label font-weight-bold' >
                        Enter your username:
                    </label>

                    <input
                        type='text'
                        name='username'
                        className='form-control inputStuff mb-3 mr-0'
                        placeholder='Username'
                        value={"000"}
                    />

                    <div className="forButton d-flex justify-content-center mt-4" style={{ width: "100%" }}>
                        <button className='btn btn-primary btn-greyish' onClick={() => {
                            console.log("testing")
                        }}>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword
