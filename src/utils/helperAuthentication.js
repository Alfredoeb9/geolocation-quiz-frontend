import { serialize, parse } from "cookie";
import { Navigate } from "react-router-dom";

export const MAX_AGE = 60 * 60 * 24 * 30;

export const setCookie = (name, value, days = 7) => {
  try {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
  } catch (error) {
    console.error('Error setting cookie:', error);
    throw error; // Re-throw to see the actual error
  }
};

export function removeCookie(cookieName) {
  const cookie = serialize(cookieName, "", {
    maxAge: -1,
    path: "/",
  });
  document.cookie = cookie;
}

export function getCookie(cookieName) {
  let cookie = {};
  if (typeof window !== "undefined") {
    cookie = parse(document.cookie);
  }
  /*
      document.cookie.split(';').forEach(function (el) {
        let [key, value] = el.split('=');
        cookie[key.trim()] = value;
      })
      */
  return cookie[cookieName];
}

export function handleRedirect(user, path) {
  setTimeout(() => {
    if (!user) return window.location.replace("http://localhost:3000/login");
    if (path === "profile") {
      return <Navigate to={"/profile"} />;
    }
    if (user) {
      return window.location.replace("http://localhost:3000/");
    }
  }, 200);
}
