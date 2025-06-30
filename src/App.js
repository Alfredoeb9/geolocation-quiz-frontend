import { lazy, Suspense, useEffect } from 'react';
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ReactGA from "react-ga4";
import RootLayout from "./layouts/RootLayout";

import PrivateRoutes from "./components/PrivateRoutes";
import Home from "./pages/Home";
import Welcome from "./pages/Welcome";
import Profile from "./pages/Profile";
import GeoQuizHome from "./pages/geoQuiz/GeoQuizHome";
// import GeoQuiz from "./pages/geoQuiz/GeoQuiz";
import GeoQuizResults from "./pages/geoQuiz/GeoQuizResults";
// import Quiz from "./pages/geoQuiz/Quiz";
import NotFound from "./pages/NotFound";
import Login from "./pages/login/Login";
import VerifyEmail from "./pages/verifyEmail/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ForgotPassword/ResetPassword";

import SignUp from "./pages/signup/SignUp";
import Results from "./pages/myResults/Results";
import MyResults from "./pages/myResults/MyResults";
// import GeoMaps from "./pages/geoMaps/GeoMaps";
import FactsAndStats from "./pages/factsAndStats/FactsAndStats";
import USFact from "./pages/factsAndStats/USFact";

import "./App.css";

const Loading = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh',
    fontSize: '18px'
  }}>
    Loading...
  </div>
);

// Lazy load heavy components
const GeoQuiz = lazy(() => import('./pages/geoQuiz/GeoQuiz'));
const Quiz = lazy(() => import('./pages/geoQuiz/Quiz'));
const GeoMaps = lazy(() => import('./pages/geoMaps/GeoMaps'));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route element={<PrivateRoutes />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/results" element={<Results />} />
        <Route path="/results/:id" element={<MyResults />} />
        <Route path="/geoquiz/" element={<GeoQuizHome />} />
        <Route path="/geoquiz/:id" element={
          <Suspense fallback={<Loading />}>
            <GeoQuiz />
          </Suspense>
        } />
        <Route path="/geoquiz/:id/quiz" element={
          <Suspense fallback={<Loading />}>
            <Quiz />
          </Suspense>
        } />
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
      <Route path="/maps" element={
        <Suspense fallback={<Loading />}>
            <GeoMaps />
          </Suspense>
      } />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  const helmetContext = {};

  useEffect(() => {
    // Initialize GA asynchronously
    if (process.env.REACT_APP_GA_ID && !window.gtag) {
      ReactGA.initialize(process.env.REACT_APP_GA_ID, {
        gaOptions: {
          cookieExpires: 60 * 60 * 24 * 365, // 1 year in seconds
          cookieDomain: 'auto',
          cookieFlags: 'SameSite=None; Secure',
        },
      });

      ReactGA.send({
        hitType: "pageview",
        page: window.location.pathname + window.location.search,
        title: "Pages Data",
      });
    }
  }, []);

  return (
    <HelmetProvider context={helmetContext}>
      <RouterProvider router={router} />
    </HelmetProvider>
  );
}

export default App;
