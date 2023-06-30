import React, { useReducer } from "react";
import UserContext from "./user-context";

const date = (val) =>
  new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(new Date(val));

const initData = {
  isLoggedIn: false,
  userID: "",
  userEmail: "",
  userJoined: "",
  userLast: "",
};

const dataReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        isLoggedIn: action.isLoggedIn,
        userID: action.userID,
        userEmail: action.userEmail,
        userJoined: date(action.userJoined),
        userLast: date(action.userLast),
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
    collector: dataCollector,
  };

  return (
    <UserContext.Provider value={userProvider}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
