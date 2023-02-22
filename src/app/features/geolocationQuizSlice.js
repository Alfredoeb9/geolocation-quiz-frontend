import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  geoQuiz: null,
};

export const geoQuizSlice = createSlice({
  name: "geoQuiz",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    getGeoQuiz: (state, action) => {
      console.log(action.payload.questions[0].question);
      // state.geoQuiz = action.payload;
      state.geoQuiz = {
        _id: action.payload._id,
        country: action.payload.country,
        questions: [
          {
            question: action.payload.questions.map((question) => {
              return question.question;
            }),
          },
        ],
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

export const { getGeoQuiz, createGeoQuiz, deleteGeoQuiz, updateGeoQuiz } =
  geoQuizSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectGeoQuiz = (state) => state.geoQuiz.geoQuiz;

export default geoQuizSlice.reducer;
