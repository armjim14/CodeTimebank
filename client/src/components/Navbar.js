import React, { useContext, Fragment, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import AuthContext from "../Context/auth/authContext";

function Navbar(props) {
  const authContext = useContext(AuthContext);
  const { logout, isAuthenticated, loadUser } = authContext;

  const goHome = async e => {
    logout();
    return <Redirect to='/' />;
  };

  useEffect(() => {
    function fetchData() {
      loadUser()
    }
    fetchData();
    //eslint-disable-next-line
  }, []);

  const restLinks = () => {
    if (isAuthenticated) {
      return (
        <Fragment>
          <li className='nav-item'>
            <Link
              style={style.forTextEven}
              className='nav-link text-white'
              to='/dashboard'
            >
              Dashboard
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              style={style.forTextOdd}
              className='nav-link text-white'
              to='/providehelp'
            >
              Help Others
              </Link>
          </li>
          <li className='nav-item'>
            <Link
              style={style.forTextEven}
              className='nav-link text-white'
              to='/gethelp'
            >
              Request Help
              </Link>
          </li>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <li className='nav-item'>
            <Link
              style={style.forTextOdd}
              className='nav-link text-white'
              to='/login'
            >
              Login
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              style={style.forTextOdd}
              className='nav-link text-white'
              to='/register'
            >
              Register
            </Link>
          </li>
        </Fragment>
      );
    }
  }; //, [isAuthenticated, props.history]);

  return (
    <header className='container-fluid'>
      <nav className='row navbar navbar-expand-lg navbar-light bg-gradient-mariner py-2'>
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

        <div style={style.linkSize} className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav m-auto'>
          <li className='nav-item'>
              <Link
                style={style.forTextOdd}
                className='nav-link text-white'
                to='/'
              >
                TempDash
              </Link>
            </li>
          <li className='nav-item'>
              <Link
                style={style.forTextOdd}
                className='nav-link text-white'
                to='/about'
              >
                About
              </Link>
            </li>
            {restLinks()}
            <li className='nav-item'>
              <Link
                style={style.forTextOdd}
                className='nav-link text-white'
                to='/leaderboards'
              >
                Leaderboards
              </Link>
            </li>
          </ul>
          {isAuthenticated && (
            <div
              onClick={goHome}
              style={{ cursor: "pointer" }}
              className='nav-item text-right text-white'
            >
              Logout
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

// this style is here incase having every other Link a different color might better
const style = {
  forHeader: {
    fontSize: "2.3rem",
    color: "black"
  },
  forTextOdd: {
    color: "black"
  },
  forTextEven: {
    color: "#252525"
  },
  linkSize: {
    fontSize: "1.1rem"
  }
};

export default Navbar;
