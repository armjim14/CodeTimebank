import React, { useEffect, useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../Context/auth/authContext";

function Navbar(props) {
  const authContext = useContext(AuthContext);
  const { login, error, clearErrors, isAuthenticated } = authContext;

  const restLinks = () => {
    if (isAuthenticated) {
      return (
        <Fragment>
          <li className='nav-item'>
            <Link
              style={style.forTextEven}
              className='nav-link'
              to='/dashboard'
            >
              Profile
            </Link>
          </li>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <li className='nav-item'>
            <Link style={style.forTextOdd} className='nav-link' to='/login'>
              Login
            </Link>
          </li>
          <li className='nav-item'>
            <Link style={style.forTextOdd} className='nav-link' to='/register'>
              Register
            </Link>
          </li>
        </Fragment>
      );
    }
  }; //, [isAuthenticated, props.history]);

  return (
    <header>
      <div className='row text-center mt-3 mb-3'>
        <div className='col-md-12'>
          <Link style={style.forHeader} to='/'>
            <h1 className='pt-2'>Code Timebank</h1>
          </Link>
        </div>
      </div>
      <nav className='navbar navbar-expand-lg navbar-light bg-light mb-3'>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>

        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav m-auto'>
            {restLinks()}
            <li className='nav-item'>
              <Link style={style.forTextOdd} className='nav-link' to='/'>
                Help Others
              </Link>
            </li>
            <li className='nav-item'>
              <Link style={style.forTextEven} className='nav-link' to='/'>
                Request Help
              </Link>
            </li>
            <li className='nav-item'>
              <Link style={style.forTextOdd} className='nav-link' to='/'>
                Leaderboards
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

// this style is here incase having every other Link a different color might better
const style = {
  forHeader: {
    fontSize: "35px",
    color: "black"
  },
  forTextOdd: {
    color: "black"
  },
  forTextEven: {
    color: "#252525"
  }
};

export default Navbar;
