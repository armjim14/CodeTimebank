import React, { Fragment } from "react";

function MainPage() {
  const displayOrHide = e => {
    if (e.target.parentNode.nextSibling.style.display === "none") {
      e.target.parentNode.nextSibling.style.display = "block";
      e.target.className = "fas fa-caret-up arrow ml-2";
    } else {
      e.target.parentNode.nextSibling.style.display = "none";
      e.target.className = "fas fa-caret-down arrow ml-2";
    }
  };

  return (
    <Fragment>
      <div className='row'>
        <div className='col-md-12 my-3'>
          <h1 className='text-center text-black'>About</h1>
        </div>
      </div>

      <div className='row mx-auto'>
        <div className='col-md-12 d-flex justify-content-center'>
          <blockquote className='blockquote border border-greyish text-justify text-center shadow-sm w-75'>
            <p className='p-2 mx-auto'>
              Timebanking is a time-based currency. Give one hour of service to
              another, and receive one time credit. You can use the credits in
              turn to receive services. The focus of Timebanking is on our value
              as human beings. It seeks to connect us through the relationships
              we create through giving and receiving.
              <br />
              <b className='pt-3'>
                An hour of service is always one time credit regardless of the
                nature of the service performed.
              </b>
            </p>
            <footer className='blockquote-footer'>
              <cite>Timebanks.org</cite>
            </footer>
          </blockquote>
        </div>
      </div>
      <div className='row mt-5'>
        <div className='col-md-12 text-center w-100 py-2'>
          <h2>
            <b>Frequently Asked Questions (FAQ)</b>
          </h2>
        </div>
      </div>
      <div className='row mx-auto'>
        <div className='col-md-12'>
          <h3 className='text-center text-black border rounded faq'>
            Great! How do I get started?
            <i
              className='fas fa-caret-down ml-2 arrow'
              onClick={displayOrHide}
            />
          </h3>
          <ul
            className='list-group list-group-flush px-5 text-center'
            style={{ display: "none" }}
          >
            <li className='list-group-item list-group-item-athens'>
              Register above or{" "}
              <span>
                <a
                  href='/register'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-primary'
                >
                  click here
                </a>
              </span>{" "}
              to make an account
            </li>
            <li className='list-group-item list-group-item-athens'>
              Click "Help Others" to find questions to answer to earn credits!
            </li>
            <li className='list-group-item list-group-item-athens'>
              Go to "Request Help" to ask questions.
            </li>
          </ul>
        </div>
      </div>
      <div className='row mx-auto'>
        <div className='col-md-12'>
          <h3 className='text-center text-black border rounded faq'>
            What is the leaderboard for?
            <i
              className='fas fa-caret-down ml-2 arrow'
              onClick={displayOrHide}
            />
          </h3>
          <div
            className='col-md-12 px-5 text-center'
            style={{ display: "none" }}
          >
            <p>
              Our users that help others the most will show up near the top of
              the leaderboards. Tech recruiters and our community in general can
              see who the most altruistic members are. Users may also display
              whether or not they're available to be hired. Similarly, community
              members can look on the leaderboards to find out who answered
              what, and possibly seek advice from our most knowledgeable
              members.
            </p>
          </div>
        </div>
      </div>
      <div className='row mx-auto'>
        <div className='col-md-12'>
          <h3 className='text-center text-black border rounded faq'>
            How do users contact each other?
            <i
              className='fas fa-caret-down ml-2 arrow'
              onClick={displayOrHide}
            />
          </h3>
          <div
            className='col-md-12 px-5 text-center'
            style={{ display: "none" }}
          >
            <p>
              Users communicate on Skype and Discord. With voice chat, instant
              messaging, and screen sharing, users can solve issues more
              efficiently.
            </p>
            <p className='my-3 text-cello'>
              <a
                href='https://discord.gg/WGBFhcj'
                target='_blank'
                rel='noopener noreferrer'
                className='text-primary'
              >
                <i className='fab fa-discord mr-2' />
                Join our Discord!
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className='row mx-auto'>
        <div className='col-md-12'>
          <h3 className='text-center text-black border rounded faq'>
            How do I earn time?
            <i
              className='fas fa-caret-down ml-2 arrow'
              onClick={displayOrHide}
            />
          </h3>
          <div
            className='col-md-12 px-5 text-center'
            style={{ display: "none" }}
          >
            <p>
              Answer questions on the Help Others page. Users should give you
              credit for any help that you have provided. If not, talk to an
              admin on Discord.
            </p>
          </div>
        </div>
      </div>
      <div className='row mx-auto'>
        <div className='col-md-12'>
          <h3 className='text-center text-black border rounded faq'>
            How come I lost time? What happens if I have negative credits?
            <i
              className='fas fa-caret-down ml-2 arrow'
              onClick={displayOrHide}
            />
          </h3>
          <div
            className='col-md-12 px-5 text-center'
            style={{ display: "none" }}
          >
            <p>
              Time is lost whenever you receive help from others. Negative
              credits only affects your ranking in the leaderboard.
            </p>
          </div>
        </div>
      </div>
      <div className='row mx-auto mb-5'>
        <div className='col-md-12'>
          <h3 className='text-center text-black border rounded faq'>
            How much does it cost?
            <i
              className='fas fa-caret-down ml-2 arrow'
              onClick={displayOrHide}
            />
          </h3>
          <div
            className='col-md-12 px-5 text-center'
            style={{ display: "none" }}
          >
            <p>
              Code Timebank is free! Our currency is time. 1 credit = 1 hour.
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default MainPage;
