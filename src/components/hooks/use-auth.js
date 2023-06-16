import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase";

const useAuth = async (
  type,
  email,
  password,
  setModal,
  dispatchData,
  collector,
  navigate
) => {
  try {
    const typeUpper = type.toUpperCase().replaceAll(" ", "");
    console.log(typeUpper);
    const firebaseFunction =
      typeUpper === "SIGNUP"
        ? createUserWithEmailAndPassword
        : signInWithEmailAndPassword;
    const response = await firebaseFunction(auth, email, password);
    const user = response.user;
    collector({
      type: typeUpper,
      isLoggedIn: true,
      userID: user.uid,
      userEmail: user.email,
      userJoined: user.metadata.creationTime,
      userLast: user.metadata.lastSignInTime,
    });
    console.log("about to navigate");
    console.log(user.uid);
    console.log("navigated");
    setModal(false);
    navigate(`/user/profile/${user.uid}`);
  } catch (error) {
    console.error(error);
    console.log(error.code);
    let errType = error.code?.split("/")[0].toUpperCase();
    const str = error.code?.split("/")[1].replaceAll("-", " ");
    if (str === "wrong password") errType = "PASSWORD";
    // console.log(str);
    dispatchData({
      type: errType,
      errorType: str[0].toUpperCase() + str.slice(1),
    });
  }
};

export default useAuth;
