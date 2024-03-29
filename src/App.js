import React, { useEffect } from "react";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { HelmetProvider } from "react-helmet-async";
import ReactGA from "react-ga4";
// import { login } from "./app/features/AuthContext";
import RootLayout from "./layouts/RootLayout";

import PrivateRoutes from "./components/PrivateRoutes";
import Home from "./pages/Home";
import Welcome from "./pages/Welcome";
import Profile from "./pages/Profile";
import Featured from "./components/Featured";
import GeoQuizHome from "./pages/geoQuiz/GeoQuizHome";
import GeoQuiz from "./pages/geoQuiz/GeoQuiz";
import GeoQuizResults from "./pages/geoQuiz/GeoQuizResults";
import Quiz from "./pages/geoQuiz/Quiz";
import NotFound from "./pages/NotFound";
import Login from "./pages/login/Login";
import VerifyEmail from "./pages/verifyEmail/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ForgotPassword/ResetPassword";

import SignUp from "./pages/signup/SignUp";
import Results from "./pages/myResults/Results";
import MyResults from "./pages/myResults/MyResults";
import GeoMaps from "./pages/geoMaps/GeoMaps";
import FactsAndStats from "./pages/factsAndStats/FactsAndStats";
import USFact from "./pages/factsAndStats/USFact";

import "./App.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route element={<PrivateRoutes />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/results" element={<Results />} />
        <Route path="/results/:id" element={<MyResults />} />
        <Route path="/geoquiz/" element={<GeoQuizHome />} />
        <Route path="/geoquiz/:id" element={<GeoQuiz />} />
        <Route path="/geoquiz/:id/quiz" element={<Quiz />} />
        <Route path="/geoquiz/results" element={<GeoQuizResults />} />
        <Route path="/facts" element={<FactsAndStats />} />
        <Route path="/facts/:id" element={<USFact />} />

        {/* <Route path="/profile" element={<Profile />} /> */}
      </Route>
      <Route index element={<Home />} />
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/verify-email/:id" element={<VerifyEmail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:id" element={<ResetPassword />} />
      <Route path="/maps" element={<GeoMaps />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  const dispatch = useDispatch();

  const helmetContext = {};
  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: window.location.pathname + window.location.search,
      title: "Pages Data",
    });
  }, []);

  ReactGA.initialize(process.env.REACT_APP_GA_ID);
  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("user"));

  //   if (user) {
  //     dispatch(login(user))
  //   }
  // }, [dispatch])
  return (
    <HelmetProvider context={helmetContext}>
      <RouterProvider router={router} />
    </HelmetProvider>
  );
}

export default App;
