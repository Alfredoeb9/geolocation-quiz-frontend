import { useRef, useEffect, useState } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import CircularIndeterminate from "../../components/spinner/Spinner";
import InfoIcon from "@mui/icons-material/Info";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ResetPassword() {
  const { id } = useParams();
  const navigate = useNavigate();
  const passwordInput = useRef(null);
  const confirmPasswordInput = useRef(null);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);
  const [dataSent, setDataSent] = useState(null);
  const [show, setShow] = useState({ password: false, cpassword: false });

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
        setDataSent(true);
        setIsFetching(false);
        toast(
          "Password has been reset! You will be redirected to the login screen!"
        );
        setTimeout(() => {
          navigate("/login", { replace: true });
        }, "3000");
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
            <div className="input_Group">
              <input
                id="password"
                ref={passwordInput}
                type={`${show.password ? "text" : "password"}`}
                name="password"
                placeholder="New Password"
              />
              <span
                onClick={() => setShow({ ...show, password: !show.password })}
              >
                <InfoIcon size={25} />
              </span>
            </div>

            <label>Confirm Password</label>
            <div className="input_Group">
              <input
                id="cpassword"
                ref={confirmPasswordInput}
                type={`${show.cpassword ? "text" : "password"}`}
                name="cpassword"
                placeholder="Confirm Password"
              />

              <span
                onClick={() => setShow({ ...show, cpassword: !show.cpassword })}
              >
                <InfoIcon size={25} />
              </span>
            </div>

            <button>Submit</button>
            {error && <div className="error">{error}</div>}
          </form>
          <ToastContainer />
        </div>
      )}
    </div>
  );
}

export default ResetPassword;
