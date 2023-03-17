import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../app/features/AuthContext";

export const useLogin = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const login2 = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

    const json = await response.json();

    if (!response.ok) {
      console.log("this ran");
      setIsLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      // save to localStorage
      console.log("the ok ran");
      localStorage.setItem("user", JSON.stringify(json));
      dispatch(login(json));
      setIsLoading(false);
    }
  };

  return { login2, error, isLoading };
};
