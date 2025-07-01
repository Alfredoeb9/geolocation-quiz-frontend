/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-escape */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate, useLocation, Navigate } from "react-router-dom";
// import { handleWindowSizeChange } from "../utils/windowSizeChange";

function PrivateRoutes() {
  const location = useLocation();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [check, setCheck] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  // Add this to check if Redux Persist has rehydrated
  const { _persist } = useSelector((state) => state);
  const isRehydrated = _persist?.rehydrated;

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 400;

  // Show loading while Redux Persist is rehydrating
  if (!isRehydrated) {
    return <div>Loading...</div>;
  }

  return user ? (
    <Outlet />
  ) : isMobile ? (
    navigate("/welcome", { replace: true })
  ) : (
    // navigate("/welcome", { replace: true })
    <Navigate
      to="/login"
      state={{
        from: location,
      }}
      replace={true}
    />
  );
}

export default PrivateRoutes;
