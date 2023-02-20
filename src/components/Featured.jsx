import useFetch from "../hooks/useFetch";
import "./featured.css";

function Featured() {
  const { data, loading, error } = useFetch(
    "http://localhost:4000/api/geolocation"
  );

  console.log(data);

  return <>{data.country}</>;
}

export default Featured;
