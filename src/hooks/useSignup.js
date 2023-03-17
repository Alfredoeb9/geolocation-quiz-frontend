import { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../app/features/AuthContext";

export const useSignup = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const signup = async (user) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/auth/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      }
    );

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      // save to localStorage

      // localStorage.setItem("user", JSON.stringify(json));
      dispatch(register(json));
      setIsLoading(false);
    }
  };

  return { signup, error, isLoading };
};
