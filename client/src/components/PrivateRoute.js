import React, { useContext, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../Context/auth/authContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loadUser } = authContext;

  // console.log(rest)
  // Add a loading check later

  useEffect(() => {
    function fetchData() {
      loadUser();
    }
    fetchData();
    //eslint-disable-next-line
  }, []);

  return (
    <Route
      {...rest}
      render={props =>
        !isAuthenticated ? <Redirect to='/login' /> : <Component {...props} />
      }
    />
  );
};

export default PrivateRoute;
