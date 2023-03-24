import { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CircularIndeterminate from "../../components/spinner/Spinner";

function ResetPassword() {
  const { id } = useParams();
  const passwordInput = useRef(null);
  const confirmPasswordInput = useRef(null);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (passwordInput.current.value === confirmPasswordInput.current.value) {
      let truePassword = passwordInput.current.value;
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/reset-password`,
        {
          method: "POST",
          headers: {
            Authorization: `${id}`,
            "Content-Type": "application/json",
            "Access-Control-Allow-Methods": "POST",
          },
          body: JSON.stringify({ truePassword, id }),
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
    } else {
      setError("Please make sure passwords match!");
    }
  };
  return (
    <div className="resetPassword">
      <h1>Reset Password</h1>
      {isFetching ? (
        <CircularIndeterminate />
      ) : (
        <div className="resetPassword_container">
          <form onSubmit={handleResetPassword}>
            <label>New Password:</label>
            <input
              id="password"
              ref={passwordInput}
              type={"password"}
              placeholder="New Password"
            />

            <label>Confirm Password</label>
            <input
              id="cpassword"
              ref={confirmPasswordInput}
              type={"password"}
              placeholder="Confirm Password"
            />

            <button>Submit</button>
            {error && <div className="error">{error}</div>}
          </form>
        </div>
      )}
    </div>
  );
}

export default ResetPassword;
