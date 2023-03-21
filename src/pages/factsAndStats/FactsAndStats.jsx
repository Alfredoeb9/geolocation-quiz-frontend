import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import CircularIndeterminate from "../../components/spinner/Spinner";
import useFetch from "../../hooks/useFetch";

function FactsAndStats() {
  const { data, loading, error } = useFetch(
    `${process.env.REACT_APP_API_URL}/usfact`
  );

  return (
    <div className="quiz">
      <Helmet>
        <title>GeographQuizWorld | Facts and Stats</title>
        <meta
          name="description"
          content="Study fact files from a wide range of topics such as world geography, famous landmarks, and cultural tranditions."
        />
      </Helmet>
      <div className="quiz__container">
        {loading ? (
          <CircularIndeterminate />
        ) : (
          <>
            <h1>US Fact Files</h1>
            <p>Pick one US Fact File to learn more about a specific State!</p>

            <div className="quiz__geolocation__container">
              {data.map((data, index) => (
                <div
                  key={index}
                  className="quiz__geolocation__tab"
                  style={{
                    backgroundImage: `url(${data?.flag})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <Link to={`/facts/${data?._id}`}>{data?.stateName}</Link>
                  <span className="quiz-overlay" />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default FactsAndStats;
