import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import "../App.css";
import Navbar from "../components/Navbar";
import ReactGA from 'react-ga4';

// Create a component to track page views
const GoogleAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    if (process.env.REACT_APP_GA_ID) {
      // Initialize only once
      if (!window.GA_INITIALIZED) {
        ReactGA.initialize(process.env.REACT_APP_GA_ID);
        window.GA_INITIALIZED = true;
      }
      
      // Track page view
      ReactGA.send({
        hitType: "pageview",
        page: location.pathname + location.search,
        title: document.title,
      });
    }
  }, [location]);

  return null;
};

export default function RootLayout() {
  return (
    <div className="app">
      <GoogleAnalytics />
      <Navbar />
      <div className="app__pages">
        <Outlet />
      </div>
    </div>
  );
}
