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
              className='nav-link text-off-white'
              to='/dashboard'
            >
              Dashboard
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              style={style.forTextOdd}
              className='nav-link text-off-white'
              to='/providehelp'
            >
              Help Others
              </Link>
          </li>
          <li className='nav-item'>
            <Link
              style={style.forTextEven}
              className='nav-link text-off-white'
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
              className='nav-link text-off-white'
              to='/login'
            >
              Login
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              style={style.forTextOdd}
              className='nav-link text-off-white'
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
      <div className='row text-center bg-gradient-greyish py-4'>
        <div className='col-md-12'>
          <Link style={style.forHeader} to='/'>
            <h1
              className='text-black'
              style={{ fontFamily: "Verdana", fontWeight: "bold", fontSize: "2.3rem" }}
            >
              Code Timebank
            </h1>
          </Link>
        </div>
      </div>
      <nav className='row navbar navbar-expand-lg navbar-light bg-gradient-dbrown py-2'>
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
              <Link
                style={style.forTextOdd}
                className='nav-link text-off-white'
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
              className='nav-item text-right text-off-white'
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
  }
};

export default Navbar;
