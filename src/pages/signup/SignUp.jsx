import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useSignup } from "../../hooks/useSignup";
import { useResend } from "../../hooks/useResend";
import { handleRedirect } from "../../utils/helperAuthentication";
import { selectUserAuth } from "../../app/features/AuthContext";
import CircularIndeterminate from "../../components/spinner/Spinner";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [spinnerLoading, setSpinnerLoading] = useState(false);
  const { signup, error, isLoading } = useSignup();
  const { resend, error2, isLoading2 } = useResend();
  const user = useSelector(selectUserAuth);
  const { message } = useSelector((state) => state.user);

  useEffect(() => {
    if (user !== null) {
      handleRedirect(user);
    }

    if (message == "USER_REGISTERED") {
      setSpinnerLoading(true);
      setIsVerified(true);
    }
  }, [message, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      username,
      firstName,
      lastName,
      email,
      password,
    };

    // console.log(user);

    // dispatch(register(user));

    await signup(user);
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
    <div>
      {isLoading || spinnerLoading ? (
        <CircularIndeterminate />
      ) : (
        <>
          {!isVerified ? (
            <form className="signup" onSubmit={handleSubmit}>
              <h3>Sign up</h3>

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

              <label>Username:</label>
              <input
                type="name"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />

              <label>First Name:</label>
              <input
                type="name"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
              />

              <label>Last Name:</label>
              <input
                type="name"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
              />

              <button disabled={isLoading}>Sign Up</button>

              {error && <div className="error">{error}</div>}
            </form>
          ) : (
            <div className="reverify">
              <div className="reverify__container">
                We have sent a verification email to{" "}
                <span className="reverify__email">{email}</span>. <br />
                Click on the link in the email to verify your account.
              </div>
              <button
                disabled={isLoading2}
                className="reviery__resendBtn"
                onClick={resendEmail}
              >
                Resend Email
              </button>

              {error2 && <div className="error">{error2}</div>}
              {/* <div className="text-gray-600 py-8 text-sm">
            <a onClick={resendEmail}>Resend Email</a>
          </div> */}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default SignUp;
