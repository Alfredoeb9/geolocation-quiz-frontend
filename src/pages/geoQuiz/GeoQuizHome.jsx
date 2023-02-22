import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import "./geoQuizHome.css";

function GeoQuizHome() {
  const { data, loading, error } = useFetch(
    "http://localhost:4000/api/geolocation"
  );

  console.log(data);
  return (
    <div className="quiz">
      <div className="quiz__container">
        <h1>Learning</h1>

        <div className="quiz__geolocation__container">
          <div className="quiz__geolocation__tab">
            <Link to={`/geoquiz/${data[0]?._id}`}>{data[0]?.country}</Link>
          </div>
          <div className="quiz__geolocation__tab">
            <Link to={`/geoquiz/${data[0]?._id}`}>{data[0]?.country}</Link>
          </div>
          <div className="quiz__geolocation__tab">
            <Link to={`/geoquiz/${data[0]?._id}`}>{data[0]?.country}</Link>
          </div>
          <div className="quiz__geolocation__tab">
            <Link to={`/geoquiz/${data[0]?._id}`}>{data[0]?.country}</Link>
          </div>
          <div className="quiz__geolocation__tab">
            <Link to={`/geoquiz/${data[0]?._id}`}>{data[0]?.country}</Link>
          </div>
          <div className="quiz__geolocation__tab">
            <Link to={`/geoquiz/${data[0]?._id}`}>{data[0]?.country}</Link>
          </div>
          <div className="quiz__geolocation__tab">
            <Link to={`/geoquiz/${data[0]?._id}`}>{data[0]?.country}</Link>
          </div>
          <div className="quiz__geolocation__tab">
            <Link to={`/geoquiz/${data[0]?._id}`}>{data[0]?.country}</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GeoQuizHome;
