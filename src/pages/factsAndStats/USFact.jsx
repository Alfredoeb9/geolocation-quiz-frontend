import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getGeoQuiz } from "../../app/features/geolocationQuizSlice";
import CircularIndeterminate from "../../components/spinner/Spinner";
import "./usFact.css";

function USFact() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [error, setError] = useState("");
  const [emptyFields, setEmptyFields] = useState([]);
  const [activity, setActivity] = useState("");
  const [numofGeoQuiz, setNumofGeoQuiz] = useState(1);
  const [checked, setChecked] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchGeoData = async () => {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/usfact/${id}`,
        {
          method: "GET",
        }
      );

      const json = await response.json();

      if (!response.ok) {
        setLoading(false);
        setError(json.error);
      }

      if (response.ok) {
        setLoading(false);
        setData(json);
      }
    };

    fetchGeoData();
  }, [id]);

  console.log(data);
  return (
    <div className="usFact">
      <div className="usFact__container">
        <div className="usFact__data">
          <h1>{data.stateName}</h1>
          <p>
            <span>Capital:</span> {data.capital}
          </p>
          <p>
            <span>Statehood:</span> {data.statehood}
          </p>
          <p>
            <span>Major cities: </span>
            {data.majorCities}
          </p>
          <p>
            <span>Population:</span> {data.population}
          </p>
          <p>
            <span>Area:</span> {data.area}
          </p>
          <p>
            <span>Bordering States:</span> {data.borderingStates}
          </p>
          <p>
            <span>Nicknames:</span> {data.nickNames}
          </p>
          <p>
            <span>Mountain Ranges: </span>
            {data.mountainRanges}
          </p>
          <p>
            <span>Rivers: </span>
            {data.rivers}
          </p>
          <p>
            <span>Lakes and Reservoirs:</span> {data.lakesAndReservoirs}
          </p>
          <p>
            <span>Plateaus: </span>
            {data.plateaus}
          </p>
          <p>
            <span>Islands: </span>
            {data.islands}
          </p>
          <p>
            <span>Caves: </span>
            {data.caves}
          </p>
          <p>
            <span>Canyons: </span>
            {data.canyons}
          </p>
          <p>
            <span>Valleys: </span>
            {data.valleys}
          </p>
          <p>
            <span>National Forests: </span>
            {data.nationalForests}
          </p>
          <p>
            <span>National Monument: </span>
            {data.nationalMonument}
          </p>
          <p>
            <span>Major Airports </span>
            {data.majorAirports}
          </p>
        </div>

        <img
          className="usFact__flag"
          alt={`${data.stateName} state flag`}
          src={`${data.flag}`}
        />
      </div>
    </div>
  );
}

export default USFact;
