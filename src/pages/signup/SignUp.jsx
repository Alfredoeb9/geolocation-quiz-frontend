import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSignup } from "../../hooks/useSignup";
import { handleRedirect } from "../../utils/helperAuthentication";
import {
  userAuthSlice,
  selectUserAuth,
  register,
} from "../../app/features/AuthContext";
import authAPI from "../../app/api/authApi";

function SignUp() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const { signup, error, isLoading } = useSignup();
  const user = useSelector(selectUserAuth);

  useEffect(() => {
    if (user !== null) {
      handleRedirect(user);
    }
  }, [user]);

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

    dispatch(register(user));

    // await signup(username, firstName, lastName, email, password);
  };

  const resendEmail = async () => {
    try {
      const resend = await authAPI.resendVerifyEmail(email);
      console.log(resend);
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
        <div hoverable className="text-xl p-8 mt-20 text-center">
          <div className="mx-auto">
            <div style={{ fontSize: "4rem", color: "#666" }} />
          </div>
          <div className="text-gray-600 text-sm py-4">
            We have sent a verification email to{" "}
            <span className="font-bold">test@email.com</span>. <br />
            Click on the link in the email to verify your account.
          </div>
          <div className="text-gray-600 py-8 text-sm">
            <a onClick={resendEmail}>Resend Email</a>
          </div>
        </div>
      )}
    </>
  );
}

export default SignUp;
