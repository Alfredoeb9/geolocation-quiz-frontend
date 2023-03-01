import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import "../geoQuiz/geoQuizHome.css";

function Results() {
  const { data, loading, error } = useFetch(
    "http://localhost:4000/api/geolocation"
  );

  return (
    <div className="quiz">
      <div className="quiz__container">
        <h1>Click on Category to view Results</h1>

        <div className="quiz__geolocation__container">
          <div className="quiz__geolocation__tab">
            <Link to={`/results/${data[0]?._id}`}>{data[0]?.country}</Link>
          </div>
          <div className="quiz__geolocation__tab">
            <Link to={`/results/${data[1]?._id}`}>{data[1]?.country}</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Results;
