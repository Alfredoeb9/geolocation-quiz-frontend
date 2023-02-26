import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLogin } from "../../hooks/useLogin";
import {
  userAuthSlice,
  selectUserAuth,
  login,
} from "../../app/features/AuthContext";
import { handleRedirect } from "../../utils/helperAuthentication";

function Login() {
  const dispatch = useDispatch();
  const user = useSelector(selectUserAuth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login2, error, isLoading } = useLogin();

  useEffect(() => {
    if (user !== null) {
      handleRedirect(user, "/");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    // dispatch(login(user));

    await login2(email, password);
  };

  return (
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
  );
}

export default Login;
