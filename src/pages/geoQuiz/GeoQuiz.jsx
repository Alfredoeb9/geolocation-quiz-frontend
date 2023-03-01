/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getGeoQuiz } from "../../app/features/geolocationQuizSlice";
import CircularIndeterminate from "../../components/spinner/Spinner";

function GeoQuiz() {
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
        `http://localhost:4000/api/geolocation/${id}`,
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

  // const handleCheckedChange = (event) => {
  //   setChecked(event.target.checked);
  // };

  // const handleTrackActivity = (e) => {
  //   e.preventDefault();

  //   setActivity(e.target.value);
  // };

  const handleNumofGeoQuiz = (e) => {
    e.preventDefault();
    // console.log(e.target.value);

    setNumofGeoQuiz(e.target.value);
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const response = await fetch(
      `http://localhost:4000/api/geolocation/${id}`,
      {
        method: "POST",
        body: JSON.stringify({ quizNum: numofGeoQuiz }),
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const json = await response.json();

    if (!response.ok) {
      setLoading(false);
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }

    if (response.ok) {
      setLoading(false);
      setNumofGeoQuiz(1);
      setError(null);
      setActivity("");
      setEmptyFields([]);

      dispatch(getGeoQuiz(json));
      navigate(`/geoquiz/${id}/quiz`);
    }
  };

  return (
    <div className="geoquiz">
      <div className="geoquiz__container">
        {isLoading ? (
          <CircularIndeterminate />
        ) : (
          <form className="create" onSubmit={handleSubmit}>
            <h3>Geolocation ({data.country}) Quiz Set-up</h3>

            <div>
              <div
                className={checked ? "geolocation-q-dropDown" : "hide-messages"}
              >
                <label>Select The Number of Questions</label>
                <select
                  name="geolocation-q-num"
                  id="geolocation_q_num"
                  onChange={(e) => handleNumofGeoQuiz(e)}
                >
                  <option className="tt-suggestion tt-selectable" value={1}>
                    1
                  </option>
                  <option className="tt-suggestion tt-selectable" value={5}>
                    5
                  </option>
                  <option className="tt-suggestion tt-selectable" value={10}>
                    10
                  </option>
                  <option className="tt-suggestion tt-selectable" value={15}>
                    15
                  </option>
                  <option className="tt-suggestion tt-selectable" value={20}>
                    20
                  </option>
                  <option className="tt-suggestion tt-selectable" value={25}>
                    25
                  </option>
                </select>
              </div>
            </div>

            <button>Begin Quiz!</button>

            {error && <div className="error">{error}</div>}
          </form>
        )}
      </div>
    </div>
  );
}

export default GeoQuiz;
