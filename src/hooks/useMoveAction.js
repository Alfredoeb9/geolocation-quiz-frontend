import { useDispatch } from "react-redux";
import {
  moveNextAction,
  movePrevAction,
} from "../app/features/geolocationQuizSlice";

export const MoveNextQuestion = () => async (dispatch) => {
  try {
    dispatch(moveNextAction());
  } catch (error) {
    console.log(error);
  }
};

export const MovePrevQuestion = () => async (dispatch) => {
  try {
    dispatch(movePrevAction());
  } catch (error) {
    console.log(error);
  }
};
