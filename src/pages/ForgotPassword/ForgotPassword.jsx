import { useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import CircularIndeterminate from "../../components/spinner/Spinner";

function ForgotPassword() {
  const navigate = useNavigate();
  const emailRef = useRef(null);

  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(false);
  const [dataSent, setDataSent] = useState(null);

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
          setDataSent(true);
          setIsFetching(false);
          toast("Password reset link has been sent to email!");
          // navigate("/login", { replace: true });
        }

        return json;
      }
    } catch (error) {
      setIsFetching(false);
      setError(error);
      toast("Error in sending your email. Please refresh and try again");
    }
  };
  return (
    <div className="forgotPassword">
      {isFetching ? (
        <CircularIndeterminate />
      ) : dataSent ? (
        <div className="forgotPassword__sent">
          <h3>
            Password Link has been sent, please visit your email and follow the
            instructions to reset your password
          </h3>
        </div>
      ) : (
        <div className="forgotPassword__container">
          <h1>Forgot Password</h1>
          <p>
            Enter your email address and we will send you instructions to reset
            your password.
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
      )}
      <ToastContainer />
    </div>
  );
}

export default ForgotPassword;
