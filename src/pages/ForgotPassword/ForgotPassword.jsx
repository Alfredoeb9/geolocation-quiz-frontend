import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const emailRef = useRef(null);

  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(false);

  const handlePasswordRest = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;

    try {
      if (email) {
        setIsFetching(true);
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/auth/forgot-password`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
          }
        );

        const json = await response.json();

        if (!response.ok) {
          setIsFetching(false);
          setError(json.error);
        }

        if (response.ok) {
          setIsFetching(false);
        }

        return json;
      }
    } catch (error) {
      setError(error);
    }
  };
  return (
    <div className="forgotPassword">
      <h1>Forgot Password</h1>
      <p>
        Enter your email address and we will send you instructions to reset your
        password.
      </p>

      <form onSubmit={handlePasswordRest}>
        <input type={"email"} ref={emailRef} placeholder="Email" />

        <button>Submit</button>

        {error && <div className="error">{error}</div>}
      </form>

      <p>
        Don't have an account?
        <Link to={"/signup"}>Sign up</Link>
      </p>
    </div>
  );
}

export default ForgotPassword;
