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
  CLEAR_ERRORS,
  RETRIEVE_FAIL,
  GITHUB_DATA,
  GITHUB_PROFILE
} from "../types";

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    error: null,
    user: null,
    arr: [],
    ghAvatar: null,
    ghName: null,
    ghCompany: null,
    ghBlog: null,
    ghLocation: null,
    ghBio: null,
    ghRepos: null
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
      if (err.response.data.errors) {
        dispatch({
          type: REGISTER_FAIL,
          payload: err.response.data.errors[0].msg
        });
      } else {
        dispatch({ type: REGISTER_FAIL, payload: err.response.data.msg });
      }
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
      // console.log(formFields);
      const res = await axios.post("/api/users/login", formFields, config);
      // console.log(res);
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });

      loadUser();
    } catch (err) {
      dispatch({ type: LOGIN_FAIL, payload: err.response.data.msg });
    }
  };

  // logout
  const logout = () => {
    dispatch({ type: LOGOUT });
    // window.location.reload();
  };

  // clear errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  // getting info for the edit profile page
  const getUsernames = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    loadUser();

    try {
      const res = await axios.get("/api/users");
      // console.log(res.data);
      return res.data;
    } catch (err) {
      dispatch({ type: RETRIEVE_FAIL, payload: err.response.data.msg });
    }
  };

  //updating contact info from the userprofile page
  const updateInfo = async formFields => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.put("/api/users/", formFields, config);
      return res;
    } catch (err) {
      dispatch({ type: REGISTER_FAIL, payload: err.response.data.msg });
    }
  };

  //updating password
  const changePassword = async formFields => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      let res = await axios.put("/api/users/password", formFields, config);
      // console.log(`this is change password`, res.status);
      return res;
    } catch (err) {
      console.error(err);
      return err;
      // dispatch({ type: REGISTER_FAIL, payload: err.response.data.msg });
    }
  };

  // Github API call for bar chart

  const getRepos = username => {
    let initArr = [
      {
        title: "JavaScript",
        value: 0
      },
      {
        title: "CSS",
        value: 0
      },
      {
        title: "HTML",
        value: 0
      },
      {
        title: "C#",
        value: 0
      },
      {
        title: "C++",
        value: 0
      },
      {
        title: "C",
        value: 0
      },
      {
        title: "Java",
        value: 0
      },
      {
        title: "PHP",
        value: 0
      },
      {
        title: "Python",
        value: 0
      },
      {
        title: "Ruby",
        value: 0
      },
      {
        title: "Perl",
        value: 0
      },
      {
        title: "SQL",
        value: 0
      },
      {
        title: "NOSQL",
        value: 0
      },
      {
        title: "Other",
        value: 0
      }
    ];
    delete axios.defaults.headers.common["x-auth-token"];
    axios(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
    ).then(res => {
      // console.log(res);
      for (let i = 0; i < res.data.length; i++) {
        switch (res.data[i].language) {
          case "JavaScript":
            initArr[0].value++;
            break;
          case "CSS":
            initArr[1].value++;
            break;
          case "HTML":
            initArr[2].value++;
            break;
          case "C#":
            initArr[3].value++;
            break;
          case "C++":
            initArr[4].value++;
            break;
          case "C":
            initArr[5].value++;
            break;
          case "Java":
            initArr[6].value++;
            break;
          case "PHP":
            initArr[7].value++;
            break;
          case "Python":
            initArr[8].value++;
            break;
          case "Ruby":
            initArr[9].value++;
            break;
          case "Perl":
            initArr[10].value++;
            break;
          case "SQL":
            initArr[11].value++;
            break;
          case "NoSQL":
            initArr[12].value++;
            break;
          default:
            // console.log("Other is", res.data[i]);
            initArr[13].value++;
            break;
        }
      }
    });
    dispatch({ type: GITHUB_DATA, payload: initArr });
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
  };

  const getGithubInfo = async username => {
    try {
      const resp = await axios.get(`/api/github/${username}`);
      // console.log(`github resp is`, resp.data);
      dispatch({ type: GITHUB_PROFILE, payload: resp.data });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        error: state.error,
        user: state.user,
        arr: state.arr,
        ghAvatar: state.ghAvatar,
        ghName: state.ghName,
        ghCompany: state.ghCompany,
        ghBlog: state.ghBlog,
        ghLocation: state.ghLocation,
        ghBio: state.ghBio,
        ghRepos: state.ghRepos,
        register,
        loadUser,
        login,
        logout,
        clearErrors,
        getUsernames,
        updateInfo,
        changePassword,
        getRepos,
        getGithubInfo
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
