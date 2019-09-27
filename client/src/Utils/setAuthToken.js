import axios from "axios";

const setAuthToken = t => {
  if (t) {
    axios.defaults.headers.common["x-auth-token"] = t;
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
  }
};

export default setAuthToken;
