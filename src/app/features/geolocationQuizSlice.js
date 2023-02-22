/* eslint-disable no-self-assign */
import { createSlice } from "@reduxjs/toolkit";

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
    getGeoQuiz: (state, action) => {
      // state.geoQuiz = action.payload;
      state.trace = state.trace;
      state.answers = { ...state.answers };
      state.queue = action.payload.questions.map((question) => {
        return {
          id: question.id,
          question: question.question,
          _id: question._id,
        };
      });
      state.geoQuiz = {
        _id: action.payload._id,
        country: action.payload.country,
        questions: action.payload.questions.map((question) => {
          return {
            id: question.id,
            question: question.question,
            _id: question._id,
          };
        }),
        // _id: action.payload.questions.map((question) => {
        //   return question._id;
        // }),
      };
    },
    moveNextAction: (state) => {
      console.log("running this right now");
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

    createGeoQuiz: (state, action) => {
      state.geoQuiz = [action.payload, ...state.geoQuiz];
    },

    deleteGeoQuiz: (state, action) => {
      state.geoQuiz = state.geoQuiz.filter(
        (geoQuiz) => geoQuiz._id !== action.payload._id
      );
    },

    updateGeoQuiz: (state, action) => {
      console.log(state.geoQuiz);
      console.log(action.payload);
      state.geoQuiz = state.geoQuiz.filter(
        (geoQuiz) => geoQuiz._id !== action.payload._id
      );
      state.geoQuiz = [action.payload, ...state.geoQuiz];
    },
  },
});

export const {
  getGeoQuiz,
  createGeoQuiz,
  deleteGeoQuiz,
  updateGeoQuiz,
  moveNextAction,
  movePrevAction,
} = geoQuizSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectGeoQuiz = (state) => state.geoQuiz.geoQuiz;
export const selectGeoQueue = (state) => state.geoQuiz.queue;
export const selectGeoTrace = (state) => state.geoQuiz.trace;

export default geoQuizSlice.reducer;
