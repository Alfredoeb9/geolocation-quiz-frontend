import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import "./featured.css";

function Featured() {
  const { data, loading, error } = useFetch(
    "http://localhost:4000/api/geolocation"
  );

  console.log(data);

  return (
    <>
      <Link to={`/geoquiz/${data[0]?._id}`}>{data[0]?.country}</Link>
    </>
  );
}

export default Featured;
