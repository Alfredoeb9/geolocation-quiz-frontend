import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../app/features/AuthContext";
import { store } from "../app/store";

export const useLogin = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const login2 = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const text = await response.text();

      // Try to parse as JSON
      let json;

      try {
        json = text ? JSON.parse(text) : {};
      } catch (e) {
        console.error('Failed to parse JSON:', text);
        setError('Server returned invalid response');
        setIsLoading(false);
        return;
      }

      if (!response.ok) {
        setError(json.error || `Server error: ${response.status}`);
        setIsLoading(false);
        return;
      }

      console.log('Login successful, user data:', json);
      // Success
      // localStorage.setItem("user", JSON.stringify(json));
      dispatch(login(json));
      // Enhanced debug logging
      console.log('Redux state after dispatch:', store.getState());
      // Check localStorage immediately and after delays
      setTimeout(() => {
        console.log('localStorage after 100ms:', localStorage.getItem('persist:root'));
        console.log('All localStorage keys:', Object.keys(localStorage));
      }, 100);
      
      setTimeout(() => {
        console.log('localStorage after 1000ms:', localStorage.getItem('persist:root'));
      }, 1000);

      setIsLoading(false);

      return json;
    } catch (error) {
      console.error('Network error:', error);
      setError('Network error - please check if the server is running');
      setIsLoading(false); 
    }
  };

  return { login2, error, isLoading };
};
