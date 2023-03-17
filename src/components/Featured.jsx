import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import "./featured.css";

function Featured() {
  const { data, loading, error } = useFetch(
    `${process.env.REACT_APP_API_URL}/geolocation`
  );

  console.log(data);

  return (
    <>
      <Link to={`/geoquiz/${data[0]?._id}`}>{data[0]?.country}</Link>
    </>
  );
}

export default Featured;
