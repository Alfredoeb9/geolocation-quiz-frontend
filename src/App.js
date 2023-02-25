import { useEffect } from "react";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { useDispatch } from "react-redux";
// import { login } from "./app/features/AuthContext";
import RootLayout from "./layouts/RootLayout";

import PrivateRoutes from "./components/PrivateRoutes";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Featured from "./components/Featured";
import GeoQuizHome from "./pages/geoQuiz/GeoQuizHome";
import GeoQuiz from "./pages/geoQuiz/GeoQuiz";
import GeoQuizResults from "./pages/geoQuiz/GeoQuizResults";
import Quiz from "./pages/geoQuiz/Quiz";
import NotFound from "./pages/NotFound";
import Login from "./pages/login/Login";
import VerifyEmail from "./pages/verifyEmail/VerifyEmail";
import SignUp from "./pages/signup/SignUp";

import "./App.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route element={<PrivateRoutes />}>
        <Route path="/geoquiz/" element={<GeoQuizHome />} />
        <Route path="/geoquiz/:id" element={<GeoQuiz />} />
        <Route path="/geoquiz/:id/quiz" element={<Quiz />} />
        <Route path="/geoquiz/results" element={<GeoQuizResults />} />

        {/* <Route path="/profile" element={<Profile />} /> */}
      </Route>
      <Route index element={<Home />} />
      <Route path="/verify-email/:next/:id" element={<VerifyEmail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("user"));

  //   if (user) {
  //     dispatch(login(user))
  //   }
  // }, [dispatch])
  return <RouterProvider router={router} />;
}

export default App;
