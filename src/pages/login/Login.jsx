import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLogin } from "../../hooks/useLogin";
import { useResend } from "../../hooks/useResend";
import { selectUserAuth } from "../../app/features/AuthContext";
import { handleRedirect } from "../../utils/helperAuthentication";
import CircularIndeterminate from "../../components/spinner/Spinner";
import InfoIcon from "@mui/icons-material/Info";

function Login() {
  const navigate = useNavigate();
  const user = useSelector(selectUserAuth);
  const { isSuccess, message } = useSelector((state) => state.user);
  const [isVerified, setIsVerified] = useState(false);
  const [spinnerLoading, setSpinnerLoading] = useState(false);
  const [verifyEmail, setVerifyEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login2, error, isLoading } = useLogin();
  const { resend, error2, isLoading2 } = useResend();
  const [show, setShow] = useState({ password: false });

  useEffect(() => {
    if (message == "USER_AUTHORIZED") {
      setIsVerified(true);
      // setVerifyEmail(true);
    }
    if (user !== null) {
      setSpinnerLoading(true);
      navigate("/", { replace: true });
      // handleRedirect(user, "/");
    }

    // if (isSuccess) {

    // }
  }, [isSuccess, user, message, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    // dispatch(login(user));

    await login2(email, password);
  };

  const resendEmail = async () => {
    try {
      await resend(email);
      // const resend = await authAPI.resendVerifyEmail(email);
      // console.log(resend);
      // return resend;
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message)
        console.log(error);
      else {
        console.log(error);
      }
    }
  };

  return (
    <div className="login">
      {isLoading || spinnerLoading ? (
        <CircularIndeterminate />
      ) : (
        <div className="login__container">
          <form className="login__form" onSubmit={handleSubmit}>
            <h3>Log In</h3>

            <label>Email:</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <label>Password:</label>
            <div className="input_Group">
              <input
                type={`${show.password ? "text" : "password"}`}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <span
                onClick={() => setShow({ ...show, password: !show.password })}
              >
                <InfoIcon size={25} />
              </span>
            </div>

            <button onClick={handleSubmit} disabled={isLoading}>
              Log in
            </button>
            {error && <div className="error">{error}</div>}
          </form>

          <p>
            <Link to={"/forgot-password"}>Forgot Password?</Link>
          </p>

          {verifyEmail && (
            <div className="login__verify">
              <span className="login__verify__span">
                Your email is not verified.
              </span>
              Please click on the Verify Email link in the email registered
              with.
              <br />
              {/* <button onClick={resendEmail}>RESEND EMAIL</button> */}
            </div>
          )}
        </div>
      )}
      <p>
        Don't have an account <Link to={"/signup"}>Sign up</Link>
      </p>
    </div>
  );
}

export default Login;
