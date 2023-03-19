import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import "./Welcome.css";

function Welcome() {
  return (
    <div className="welcome">
      <Helmet>
        <title>GeographQuizWorld</title>
        <meta
          name="description"
          content="Need to pratice geographic questions? Geography Quiz World coveres topics such as world geography, famous landmarks, and cultural traditions, our website provides a unique learning experience that's both informative and entertaining."
        />
      </Helmet>
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
