import { Link } from "react-router-dom";
import "./Welcome.css";

function Welcome() {
  return (
    <div className="welcome">
      <div className="welcome__container">
        <h3>Become A Geography Scholar</h3>

        <h1>
          Track your journey,
          <br />
          See your results
        </h1>

        <p>
          Sign up today to start testing your Geography knowledge! It's Free!
        </p>

        <div>
          <Link to="/login">Test Your Geography</Link>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
