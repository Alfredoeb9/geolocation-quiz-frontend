import { Link } from "react-router-dom";
import CircularIndeterminate from "../../components/spinner/Spinner";
import useFetch from "../../hooks/useFetch";
import "./geoQuizHome.css";

function GeoQuizHome() {
  const { data, loading, error } = useFetch(
    `${process.env.REACT_APP_API_URL}/api/geolocation`
  );

  // if (loading) {
  //   <CircularIndeterminate />;
  // }

  data.map((data) => {
    console.log(data);
  });

  return (
    <div className="quiz">
      <div className="quiz__container">
        {loading ? (
          <CircularIndeterminate />
        ) : (
          <>
            <h1>Learning</h1>
            <p>Pick one of the Geo topics from down below to take a quiz!</p>

            <div className="quiz__geolocation__container">
              {data.map((data, index) => (
                <div key={index} className="quiz__geolocation__tab">
                  <Link to={`/geoquiz/${data._id}`}>{data.country}</Link>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default GeoQuizHome;
