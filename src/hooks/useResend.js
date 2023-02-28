import { useState } from "react";
import { useDispatch } from "react-redux";
import { verifyEmail } from "../app/features/AuthContext";

export const useResend = () => {
  const dispatch = useDispatch();
  const [error2, setError] = useState(null);
  const [isLoading2, setIsLoading] = useState(null);

  const resend = async (email) => {
    console.log(email);
    setIsLoading(true);
    setError(null);

    const response = await fetch(
      `http://localhost:4000/api/auth/resend-verification-email`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
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
      dispatch(verifyEmail(json));
      setIsLoading(false);
    }
  };

  return { resend, error2, isLoading2 };
};
