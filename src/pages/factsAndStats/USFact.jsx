import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getGeoQuiz } from "../../app/features/geolocationQuizSlice";
import CircularIndeterminate from "../../components/spinner/Spinner";
import "./usFact.css";
import { Helmet } from "react-helmet-async";
import { postscribe } from "postscribe";

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

  const goBack = () => {
    navigate(-1);
  };

  // postscribe(
  //   ".usFact__data",
  //   `<script type="application/ld+json">
  //     {
  //       "@context": "https://schema.org",
  //       "@type": "NewsArticle",
  //       "headline": "Article headline",
  //       "image": "",
  //       "datePublished": "2023-03-19T07:51:59+00:00",
  //       "dateModified": "2023-03-19T07:51:59+00:00",
  //       "author": {
  //         "@type": "Person",
  //         "name": "Alfredo Barillas"
  //       },
  //       "description":
  //         "Learn essesential geographic facts about the 50 states, District of Columbia, and more!",
  //       "isAccessibleForFree": "True",
  //       "hasPart": {
  //         "@type": "WebPageElement",
  //         "isAccessibleForFree": "True",
  //         "cssSelector": ".usFact__data"
  //       }
  //     }
  // </script>`
  // );

  return (
    <div className="usFact">
      <button className="goBack" onClick={goBack}>
        Back
      </button>
      <Helmet>
        <title>{`GeographQuizWorld | ${data?.stateName} Facts and Stats`}</title>
        <meta
          name="description"
          content={`Study facts about ${data?.stateName}. Learn more about ${data?.stateName}: Capital city, Statehood, Major Cities, Population and more geographic facts!`}
        />
        <script className="structured-data-list" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            headline: `${data?.stateName} Fact Files`,
            image: `${data?.flag}`,
            datePublished: "2023-03-19T07:51:59+00:00",
            dateModified: "2023-03-19T07:51:59+00:00",
            author: {
              "@type": "Person",
              name: "Alfredo Barillas",
            },
            description: `Learn essesential geographic facts about ${data?.statename}`,
            isAccessibleForFree: "True",
            hasPart: {
              "@type": "WebPageElement",
              isAccessibleForFree: "True",
              cssSelector: ".usFact__data",
            },
          })}
        </script>
      </Helmet>
      <div className="usFact__container">
        <div className="usFact__data">
          <h1>{data?.stateName}</h1>
          <p>
            <span>Capital:</span> {data?.capital}
          </p>
          <p>
            <span>Statehood:</span> {data?.statehood}
          </p>
          <p>
            <span>Major cities: </span>
            {data?.majorCities}
          </p>
          <p>
            <span>Population:</span> {data?.population}
          </p>
          <p>
            <span>Area:</span> {data?.area}
          </p>
          <p>
            <span>Bordering States:</span> {data?.borderingStates}
          </p>
          <p>
            <span>Nicknames:</span> {data?.nickNames}
          </p>
          <p>
            <span>Mountain Ranges: </span>
            {data?.mountainRanges}
          </p>
          <p>
            <span>Rivers: </span>
            {data?.rivers}
          </p>
          <p>
            <span>Lakes and Reservoirs:</span> {data?.lakesAndReservoirs}
          </p>
          <p>
            <span>Plateaus: </span>
            {data?.plateaus}
          </p>
          <p>
            <span>Islands: </span>
            {data?.islands}
          </p>
          <p>
            <span>Caves: </span>
            {data?.caves}
          </p>
          <p>
            <span>Canyons: </span>
            {data?.canyons}
          </p>
          <p>
            <span>Valleys: </span>
            {data?.valleys}
          </p>
          <p>
            <span>National Forests: </span>
            {data?.nationalForests}
          </p>
          <p>
            <span>National Monument: </span>
            {data?.nationalMonument}
          </p>
          <p>
            <span>Major Airports </span>
            {data?.majorAirports}
          </p>
        </div>

        <img
          className="usFact__flag"
          alt={`${data?.stateName} state flag`}
          src={`${data?.flag}`}
        />
      </div>
    </div>
  );
}

export default USFact;
