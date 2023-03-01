/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getGeoQuiz } from "../../app/features/geolocationQuizSlice";

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
    e.preventDefault();

    // console.log("working");

    // if (!user) {
    //   setError("You must be logged");
    //   return;
    // }

    // console.log(numofGeoQuiz);
    // console.log(duration);
    // console.log(currentWeight);

    // console.log(workout);

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

    // const response = await fetch(
    //   `http://localhost:4000/api/geolocation/createquiz`,
    //   {
    //     method: "POST",
    //     body: JSON.stringify(numofGeoQuiz),
    //     headers: {
    //       "Content-Type": "application/json",
    //       // Authorization: `Bearer ${user.token}`,
    //     },
    //   }
    // );

    // const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }

    if (response.ok) {
      setNumofGeoQuiz(1);
      setError(null);
      setActivity("");
      setEmptyFields([]);
      console.log("quiz returned! ", json);

      dispatch(getGeoQuiz(json));
      navigate(`/geoquiz/${id}/quiz`);
      // <Navigate
      //   to={`/`}
      //   state={{
      //     from: location,
      //   }}
      //   replace={true}
      // />;
    }
  };

  return (
    <div className="geoquiz">
      <div className="geoquiz__container">
        <form className="create" onSubmit={handleSubmit}>
          <h3>Geolocation Quiz Set-up</h3>

          {/* <label>Excersize Title: </label> */}

          {/* <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className={emptyFields.includes("title") ? "error" : ""}
          />

          <label>Load (lbs):</label>
          <input
            type="text"
            onChange={(e) => setLoad(e.target.value)}
            value={load}
            className={emptyFields.includes("load") ? "error" : ""}
          />

          <label>Reps:</label>
          <input
            type="text"
            onChange={(e) => setReps(e.target.value)}
            value={reps}
            className={emptyFields.includes("reps") ? "error" : ""}
          />

          <label>Sets</label>
          <input
            type="number"
            onChange={(e) => setSets(e.target.value)}
            value={sets}
            className={emptyFields.includes("sets") ? "error" : ""}
          /> */}

          <div>
            {/* <label>Track Calories?</label>
            <Switch
              label="Track Calories Burned"
              checked={checked}
              onChange={handleCheckedChange}
              inputProps={{ "aria-label": "controlled" }}
            /> */}
            {/* {checked ? ( */}
            <div
              className={checked ? "geolocation-q-dropDown" : "hide-messages"}
            >
              <label>Select The Number of Questions</label>
              <select
                name="geolocation-q-num"
                id="geolocation_q_num"
                onChange={(e) => handleNumofGeoQuiz(e)}
              >
                {/* {currencies.map(currency => (
  <option key={currency} value={currency}>
    {currency}
  </option>
))} */}
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

              {/* <label>Enter Duration (min)</label>
              <input
                type="number"
                onChange={(e) => setDuration(e.target.value)}
                value={duration}
              />

              <label>Current Weight (lbs)</label>
              <input
                type="number"
                onChange={(e) => setCurrentWeight(e.target.value)}
                value={currentWeight}
              /> */}
            </div>
            {/* ) : (
              ""
            )} */}
          </div>

          <button>Begin Quiz!</button>

          {error && <div className="error">{error}</div>}
        </form>
      </div>
    </div>
  );
}

export default GeoQuiz;
