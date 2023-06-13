import React, { useReducer } from "react";
import UserContext from "./user-context";

const initData = {
  isLoggedIn: false,
  userID: "",
  userEmail: "",
  userJoined: "",
  userLast: "",
  userShows: "",
  userMovies: "",
};

const dataReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        isLoggedIn: action.isLoggedIn,
        userID: action.userID,
        userEmail: action.userEmail,
        userJoined: action.userJoined,
        userLast: action.userLast,
        userShows: action.userShows,
        userMovies: action.userMovies,
      };
    case "LOGOUT":
      console.log("logout ran");
      return initData;
  }
  return initData;
};

const UserProvider = (props) => {
  const [data, dispatchData] = useReducer(dataReducer, initData);

  const dataCollector = (item) => {
    if (item.type === "LOGIN") {
      dispatchData({
        type: item.type,
        isLoggedIn: item.isLoggedIn,
        userID: item.userID,
        userEmail: item.userEmail,
        userJoined: item.userJoined,
        userLast: item.userLast,
        userShows: item.userShows,
        userMovies: item.userMovies,
      });
    } else {
      dispatchData({
        type: item.type,
      });
    }
  };

  const userProvider = {
    isLoggedIn: data.isLoggedIn,
    userID: data.userID,
    userEmail: data.userEmail,
    userJoined: data.userJoined,
    userLast: data.userLast,
    userShows: data.userShows,
    userMovies: data.userMovies,
    collector: dataCollector,
  };

  return (
    <UserContext.Provider value={userProvider}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
