import { Link } from "react-router-dom";
import CircularIndeterminate from "../../components/spinner/Spinner";
import useFetch from "../../hooks/useFetch";
import "./geoQuizHome.css";

function GeoQuizHome() {
  const { data, loading, error } = useFetch(
    "http://localhost:4000/api/geolocation"
  );

  // if (loading) {
  //   <CircularIndeterminate />;
  // }

  return (
    <div className="quiz">
      <div className="quiz__container">
        {loading ? (
          <CircularIndeterminate />
        ) : (
          <>
            <h1>Learning</h1>

            <div className="quiz__geolocation__container">
              <div className="quiz__geolocation__tab">
                <Link to={`/geoquiz/${data[0]?._id}`}>{data[0]?.country}</Link>
              </div>
              <div className="quiz__geolocation__tab">
                <Link to={`/geoquiz/${data[1]?._id}`}>{data[1]?.country}</Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default GeoQuizHome;
