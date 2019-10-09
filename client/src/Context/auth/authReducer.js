import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  USER_LOADED,
  AUTH_ERR,
  LOGOUT,
  CLEAR_ERRORS,
  RETRIEVE_FAIL,
  GITHUB_DATA,
  GITHUB_PROFILE
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false
      };
    case REGISTER_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload
      };
    case AUTH_ERR:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false
      };
    case LOGIN_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload
      };
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload
      };
    case RETRIEVE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case GITHUB_DATA:
      return {
        ...state,
        arr: [...action.payload]
      };
    case GITHUB_PROFILE:
      return {
        ...state,
        ghAvatar: action.payload.avatar_url,
        ghName: action.payload.name,
        ghCompany: action.payload.company,
        ghBlog: action.payload.blog,
        ghLocation: action.payload.location,
        ghBio: action.payload.bio,
        ghRepos: action.payload.public_repos
      };
    default:
      return state;
  }
};
