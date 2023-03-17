import { pushResult, updateResult } from "../app/features/resultSlice";
// ghost commit

export const PushAnswer = (result) => async (dispatch) => {
  console.log(result);
  try {
    await dispatch(pushResult(result));
  } catch (error) {
    console.log(error);
  }
};

export const UpdateResult = (index, checked) => async (dispatch) => {
  try {
    dispatch(updateResult(index));
  } catch (error) {
    console.log(error);
  }
};
