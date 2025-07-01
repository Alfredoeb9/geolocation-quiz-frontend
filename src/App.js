import { lazy, Suspense, useEffect } from 'react';
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { HelmetProvider } from "react-helmet-async";
import { login } from "./app/features/AuthContext";
// import ReactGA from "react-ga4";
import RootLayout from "./layouts/RootLayout";
import PrivateRoutes from "./components/PrivateRoutes";
import Welcome from "./pages/Welcome";
import Profile from "./pages/Profile";
import GeoQuizHome from "./pages/geoQuiz/GeoQuizHome";
import GeoQuizResults from "./pages/geoQuiz/GeoQuizResults";
import NotFound from "./pages/NotFound";
import Login from "./pages/login/Login";
import VerifyEmail from "./pages/verifyEmail/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ForgotPassword/ResetPassword";
import SignUp from "./pages/signup/SignUp";
import Results from "./pages/myResults/Results";
import MyResults from "./pages/myResults/MyResults";
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
const Home = lazy(() => import('./pages/Home'));
const GeoQuiz = lazy(() => import('./pages/geoQuiz/GeoQuiz'));
const Quiz = lazy(() => import('./pages/geoQuiz/Quiz'));
const GeoMaps = lazy(() => import('./pages/geoMaps/GeoMaps'));
const FactsAndStats = lazy(() => import('./pages/factsAndStats/FactsAndStats'));
const USFact = lazy(() => import('./pages/factsAndStats/USFact'));

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
        <Route path="/facts" element={
          <Suspense fallback={<Loading />}>
            <FactsAndStats />
          </Suspense>
        } />
        <Route path="/facts/:id" element={
          <Suspense fallback={<Loading />}>
            <USFact />
          </Suspense>
        } />
      </Route>
      <Route index element={
        <Suspense fallback={<Loading />}>
          <Home />
        </Suspense>
      } />
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
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("user"));

  //   if (user) {
  //     dispatch(login(user));
  //   }
  // }, [dispatch]);

  // useEffect(() => {
  //   // Initialize GA asynchronously
  //   if (process.env.REACT_APP_GA_ID && !window.gtag) {
  //     ReactGA.initialize(process.env.REACT_APP_GA_ID);

  //     ReactGA.send({
  //       hitType: "pageview",
  //       page: window.location.pathname + window.location.search,
  //       title: "Pages Data",
  //     });
  //   }
  // }, []);

  return (
    <HelmetProvider context={helmetContext}>
      <RouterProvider router={router} />
    </HelmetProvider>
  );
}

export default App;
