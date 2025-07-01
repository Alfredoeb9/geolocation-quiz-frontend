import { useDispatch } from "react-redux";
import { logout } from "../app/features/AuthContext";
import { resetGeoQuiz } from "../app/features/geolocationQuizSlice";

export const useLogout = () => {
  const dispatch = useDispatch();

  const logout2 = () => {
    dispatch(logout());
    dispatch(resetGeoQuiz());
  };

  return { logout2 };
};
