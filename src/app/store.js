import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
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
//     try {
//       key = key.replace(":", "_");
//       const value = JSON.parse(val);
//       const authVal = value.user;
//       delete value.auth;
//       localStorage.setItem(key, JSON.stringify(value));
      
//       // Add error handling for setCookie
//       if (authVal) {
//         setCookie(key, JSON.stringify(authVal));
//       }
      
//       if (callback) {
//         callback(null);
//       }
//       return Promise.resolve(null);
//     } catch (error) {
//       console.error('CookieStore setItem error:', error);
//       if (callback) {
//         callback(error);
//       }
//       return Promise.reject(error);
//     }
//   },
  
//   getItem: async (key, callback) => {
//     try {
//       key = key.replace(":", "_");
//       const dataItem = localStorage.getItem(key);
//       let item = {};
      
//       if (dataItem) {
//         item = JSON.parse(dataItem);
//       }
      
//       const authItem = getCookie(key);
//       if (authItem) {
//         try {
//           item.auth = JSON.parse(authItem);
//         } catch (e) {
//           console.warn('Failed to parse auth cookie:', e);
//         }
//       }
      
//       const result = JSON.stringify(item);
//       if (callback) {
//         callback(null, result);
//       }
//       return Promise.resolve(result);
//     } catch (error) {
//       console.error('CookieStore getItem error:', error);
//       if (callback) {
//         callback(error, null);
//       }
//       return Promise.resolve(null);
//     }
//   },

//   removeItem: async (key, callback) => {
//     try {
//       key = key.replace(":", "_");
//       removeCookie(key);
//       localStorage.removeItem(key);
      
//       if (callback) {
//         callback(null);
//       }
//       return Promise.resolve(null);
//     } catch (error) {
//       console.error('CookieStore removeItem error:', error);
//       if (callback) {
//         callback(error);
//       }
//       return Promise.reject(error);
//     }
//   },
// };

const persistAuthConfig = {
  key: "root",
  version: 1,
  storage, // Use default localStorage instead of custom CookieStore
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
        ignoredActionsPaths: ['meta.arg', 'payload.timestamp'],
        ignoredPaths: ['_persist'],
      },
      // Remove thunk as it's included by default in getDefaultMiddleware
    }),
});

export const persistor = persistStore(store);
