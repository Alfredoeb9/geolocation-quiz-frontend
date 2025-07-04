/* eslint-disable no-self-assign */
import { createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

const initialState = {
  geoQuiz: null,
  queue: [],
  answers: [],
  trace: 0,
};

export const geoQuizSlice = createSlice({
  name: "geoQuiz",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    getGeoQuiz: (state, action, numOfQuiz) => {
      let slicer = action?.payload[1];
      let data = action?.payload[0];
      state.trace = state.trace;
      state.answers = data?.questions
        ?.slice(0, Number(slicer))
        .map((question) => {
          return {
            answer: question.answer,
          };
        });
      state.queue = data?.questions
        ?.slice(0, Number(slicer))
        .map((question) => {
          return {
            id: question.id,
            question: question.question,
            _id: question._id,
          };
        });
      state.geoQuiz = {
        _id: data?._id,
        country: data?.country,
        questions: data?.questions?.slice(0, Number(slicer)).map((question) => {
          return {
            id: question.id,
            question: question.question,
            _id: question._id,
          };
        }),
      };
    },
    moveNextAction: (state) => {
      return {
        ...state,
        trace: state.trace + 1,
      };
    },

    movePrevAction: (state, action) => {
      return {
        ...state,
        trace: state.trace - 1,
      };
    },
    resetAllAction: (state, action) => {
      // storage.removeItem("persist:root");
      // storage.removeItem("persist_root");
      // localStorage.removeItem("persist:root");
      // localStorage.removeItem("persist_root");
      return initialState;
    },

    createGeoQuiz: (state, action) => {
      state.geoQuiz = [action.payload, ...state.geoQuiz];
    },

    deleteGeoQuiz: (state, action) => {
      state.geoQuiz = state.geoQuiz.filter(
        (geoQuiz) => geoQuiz._id !== action.payload._id
      );
    },

    updateGeoQuiz: (state, action) => {
      state.geoQuiz = state.geoQuiz.filter(
        (geoQuiz) => geoQuiz._id !== action.payload._id
      );
      state.geoQuiz = [action.payload, ...state.geoQuiz];
    },
    
    resetGeoQuiz: () => {
      return initialState;
    }
  },
});

export const {
  getGeoQuiz,
  createGeoQuiz,
  deleteGeoQuiz,
  updateGeoQuiz,
  moveNextAction,
  movePrevAction,
  resetAllAction,
  resetGeoQuiz,
} = geoQuizSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectGeoQuiz = (state) => state.geoQuiz.geoQuiz;
export const selectGeoQueue = (state) => state.geoQuiz.queue;
export const selectGeoTrace = (state) => state.geoQuiz.trace;

export default geoQuizSlice.reducer;
