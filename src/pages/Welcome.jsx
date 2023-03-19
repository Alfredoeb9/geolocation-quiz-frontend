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

        <meta
          name="keywords"
          content="geograph, geography quiz, geo quiz, world quiz"
        />
        <script className="structured-data-list" type="application/ld+json">
          {`{
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "GeographQuizWorld",
            "operatingSystem": ["ANDROID", "IOS", "Windows", "OS", "OSX"],
            "applicationCategory": "WebApplication",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.6",
              "ratingCount": "10",
            },
            "offers": {
              "@type": "Offer",
              "price": "0",
            },
          }`}
        </script>
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
