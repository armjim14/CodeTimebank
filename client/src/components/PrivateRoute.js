import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../Context/auth/authContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading } = authContext;
  // Add a loading check later
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
