import { combineReducers, configureStore, Tuple } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import { thunk } from "redux-thunk";
import storage from 'redux-persist/lib/storage';
import geoQuizSlice from "./features/geolocationQuizSlice";
import userAuthReducer from "./features/AuthContext";
import {
  setCookie,
  getCookie,
  removeCookie,
} from "../utils/helperAuthentication";
import resultSlice from "./features/resultSlice";

const persistAuthConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ['user'], // Only persist user data
  debug: true,
};

const authXReducer = combineReducers({
  geoQuiz: geoQuizSlice,
  user: userAuthReducer,
  results: resultSlice,
});

const persistedReducer = persistReducer(persistAuthConfig, authXReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/REGISTER',
          'persist/PURGE',
          'persist/PAUSE',
          'persist/FLUSH',
        ],
        ignoredPaths: ['_persist'],
      },
    }),
});

export const persistor = persistStore(store);
