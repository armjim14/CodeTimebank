import React, { Fragment } from "react";

function MainPage() {
  return (
    <Fragment>
      <div className='row'>
        <div className='col-md-12'>
          <h1
            className='text-center text-beige border-dbrown'
            style={{ textShadow: "1px 1px 2px #000000" }}
          >
            Welcome to the Code Timebank!
          </h1>
        </div>
      </div>
      <div className='row'>
        <div className='col-md-12'>
          <h3 className='text-center text-black'>Wait... What's a timebank?</h3>
        </div>
      </div>
      <div className='row'>
        <div className='col-md-12'>
          <blockquote className='blockquote border border-greyish text-center'>
            <p className='p-1'>
              Timebanking is a time-based currency. Give one hour of service to
              another, and receive one time credit. You can use the credits in
              turn to receive services — or you can donate them to others.
              <br />
              <b>
                An hour of service is always one time credit regardless of the
                nature of the service performed.
              </b>
            </p>
            <footer className='blockquote-footer'>
              <cite>Timebanks.org</cite>
            </footer>
          </blockquote>
          <p>
            Here, our members help one another with coding-related problems. We
            help one another by using Skype, Discord, and/or other communication
            software.
          </p>
          <hr />
        </div>
      </div>
      <div className='row'>
        <div className='col-md-12'>
          <h3 className='text-center text-black'>
            Great! How do I get started?
          </h3>
          <hr />
          <ul className='list-group'>
            <li className='list-group-item'>
              Register above or{" "}
              <span>
                <a href='/register' target='_blank' rel='noopener noreferrer'>
                  click here
                </a>
              </span>{" "}
              to make an account
            </li>
            <li className='list-group-item'>
              Click "Help Others" to find questions to answer to earn credits!
            </li>
            <li className='list-group-item'>
              Go to "Request Help" to ask questions.
            </li>
          </ul>
          <hr />
        </div>
      </div>
      <div className='row pb-5'>
        <div className='col-md-12'>
          <h3 className='text-center text-black'>
            What are the leaderboards for?
          </h3>
          <hr />
        </div>
        <div className='col-md-12'>
          <p>
            Our users that help others the most will show up near the top of the
            leaderboards. Tech recruiters and our community in general can see
            who the most altruistic members are. Using the Github API, we can
            show recruiters whether or not they're hireable. Similarly,
            community members can look on the leaderboards to find out who
            answered what, and possibly seek advice from our most knowledgeable
            members.
          </p>
        </div>
      </div>
    </Fragment>
  );
}

export default MainPage;
