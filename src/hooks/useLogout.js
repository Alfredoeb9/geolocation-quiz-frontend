import { useDispatch } from "react-redux";
import { logout } from "../app/features/AuthContext";
import { getGeoQuiz } from "../app/features/geolocationQuizSlice";

export const useLogout = () => {
  const dispatch = useDispatch();

  const logout2 = () => {
    // remove user from storage
    localStorage.removeItem("user");

    dispatch(logout(null));
    dispatch(getGeoQuiz(null));
  };

  return { logout2 };
};
