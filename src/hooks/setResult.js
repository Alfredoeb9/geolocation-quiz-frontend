import { pushResult } from "../app/features/resultSlice";

export const PushAnswer = (result) => async (dispatch) => {
  console.log(result);
  try {
    await dispatch(pushResult(result));
  } catch (error) {
    console.log(error);
  }
};
