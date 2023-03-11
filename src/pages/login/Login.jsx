import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLogin } from "../../hooks/useLogin";
import { useResend } from "../../hooks/useResend";
import { selectUserAuth } from "../../app/features/AuthContext";
import { handleRedirect } from "../../utils/helperAuthentication";
import CircularIndeterminate from "../../components/spinner/Spinner";

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
    <>
      {isLoading || spinnerLoading ? (
        <CircularIndeterminate />
      ) : (
        <>
          <form className="login" onSubmit={handleSubmit}>
            <h3>Log In</h3>

            <label>Email:</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />

            <label>Password:</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />

            <button onClick={handleSubmit} disabled={isLoading}>
              Log in
            </button>
            {error && <div className="error">{error}</div>}
          </form>

          {verifyEmail && (
            <div className="">
              <span className="">Your email is not verified.</span>
              Please click on the Verify Email link in the email registered
              with.
              <br />
              {/* <button onClick={resendEmail}>RESEND EMAIL</button> */}
            </div>
          )}
        </>
      )}
      {/* {!message ? ( */}

      {/* ) : (
        <div id="signIn__btn">
          <p>Please verify account!</p>
          <br />
          <p>Don't have an account?</p> <Link to={"/signup"}>Sign Up</Link>
        </div>
      )} */}
    </>
  );
}

export default Login;
