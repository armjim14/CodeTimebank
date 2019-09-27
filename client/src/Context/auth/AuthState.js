import React, { useReducer } from "react";
import axios from "axios";
import AuthContext from "./authContext";
import AuthReducer from "./authReducer";
import setAuthToken from "../../Utils/setAuthToken";
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  CLEAR_ERRORS
} from "../types";

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    error: null,
    user: null
  };
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // register function
  const register = async formFields => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.post("/api/users/register", formFields, config);
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });

      loadUser();
    } catch (err) {
      dispatch({ type: REGISTER_FAIL, payload: err.response.data.msg });
    }
  };

  // load user function
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const res = await axios.get("/api/users/auth");
      dispatch({ type: USER_LOADED, payload: res.data });
    } catch (err) {
      dispatch({ type: AUTH_ERR });
    }
  };

  // login
  const login = async formFields => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      console.log(formFields);
      const res = await axios.post("/api/users/login", formFields, config);
      console.log(res);
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });

      loadUser();
    } catch (err) {
      dispatch({ type: LOGIN_FAIL, payload: err.response.data.msg });
    }
  };

  // logout
  const logout = () => dispatch({ type: LOGOUT });

  // clear errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        error: state.error,
        user: state.error,
        register,
        loadUser,
        login,
        logout,
        clearErrors
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
