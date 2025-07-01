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

// const CookieStore = {
//   setItem: async (key, val, callback) => {
//     key = key.replace(":", "_");
//     const value = JSON.parse(val);
//     const authVal = value.user;
//     delete value.auth;
//     localStorage.setItem(key, JSON.stringify(value));
//     setCookie(key, JSON.stringify(authVal));
//     if (callback) {
//       callback(null);
//     }
//     return Promise.resolve(null);
//   },
//   getItem: async (key, callback) => {
//     key = key.replace(":", "_");
//     const dataItem = localStorage.getItem(key);
//     let item = {};
//     if (dataItem) item = JSON.parse(dataItem);
//     const authItem = JSON.parse(getCookie(key));
//     if (authItem) item.auth = authItem;
//     if (callback) {
//       callback(null, JSON.stringify(item));
//     }
//     return Promise.resolve(JSON.stringify(item));
//   },
//   removeItem: async (key, callback) => {
//     removeCookie(key);
//     localStorage.removeItem(key);
//     if (callback) {
//       callback(null);
//     }
//     return Promise.resolve(null);
//   },
// };

const persistAuthConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ['user'], // Only persist user data
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
