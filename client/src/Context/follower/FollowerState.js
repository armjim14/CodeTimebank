import React from "react";
import axios from "axios";
import FollowerContext from "./followerContext";

const FollowerState = props => {

    const getFollowers = async () => {
        try {
            const resp = await axios.get("/api/followers/getFollowers")
            return resp.data
        } catch (e) {
            console.log("--------");
            console.log(e)
            console.log("--------");
        }
    }

    const addFollower = async id => {
        try {
            let ob = {id}
            await axios.post(`/api/followers/add`, ob)
            return "testing"
        } catch (e) {
            console.log("--------");
            console.log(e)
            console.log("--------");
        }
    }

    const deleteFollower = async id => {
      try {
        const resp = await axios.delete(`/api/followers/delete/${id}`)
        return resp.data
      } catch (e) {

      }
    }

  return (
    <FollowerContext.Provider
      value={{
        getFollowers,
        addFollower,
        deleteFollower
      }}
    >
      {props.children}
    </FollowerContext.Provider>
  );
};

export default FollowerState;
