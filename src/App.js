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
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import PrivateRoutes from "./components/PrivateRoutes";
import NotFound from "./pages/NotFound";

import "./App.css";
import Featured from "./components/Featured";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route element={<PrivateRoutes />}>
        <Route index element={<Featured />} />
        {/* <Route path="/profile" element={<Profile />} /> */}
      </Route>
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
