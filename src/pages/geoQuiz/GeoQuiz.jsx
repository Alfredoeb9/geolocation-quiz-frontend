/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import usePostFetch from "../../hooks/usePostFetch";
import Switch from "@mui/material/Switch";
import { getGeoQuiz } from "../../app/features/geolocationQuizSlice";
import useFetch from "../../hooks/useFetch";

function GeoQuiz() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [error, setError] = useState("");
  const [emptyFields, setEmptyFields] = useState([]);
  const [activity, setActivity] = useState("");
  const [numofGeoQuiz, setNumofGeoQuiz] = useState(1);
  const [checked, setChecked] = useState(false);

  console.log(id);

  // const handleCheckedChange = (event) => {
  //   setChecked(event.target.checked);
  // };

  // const handleTrackActivity = (e) => {
  //   e.preventDefault();

  //   setActivity(e.target.value);
  // };

  const handleNumofGeoQuiz = (e) => {
    e.preventDefault();
    console.log(e.target.value);

    setNumofGeoQuiz(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("working");

    // if (!user) {
    //   setError("You must be logged");
    //   return;
    // }

    console.log(numofGeoQuiz);
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
              {/* <label>Search and Select Activity</label>
              <select
                name="geolocation-topic"
                id="geolocation_topic"
                onChange={(e) => handleTrackActivity(e)}
              >
                <option
                  className="tt-suggestion tt-selectable"
                  value={"Aerobic dancing (high impact)"}
                >
                  Aerobic dancing (high impact)
                </option>
                <option
                  className="tt-suggestion tt-selectable"
                  value={"Aerobic dancing (low impact)"}
                >
                  Aerobic dancing (low impact)
                </option>
                <option
                  className="tt-suggestion tt-selectable"
                  value={"Baseball/softball"}
                >
                  Baseball/softball
                </option>
                <option
                  className="tt-suggestion tt-selectable"
                  value={"Basketball"}
                >
                  Basketball
                </option>
                <option
                  className="tt-suggestion tt-selectable"
                  value={"Beach volleyball"}
                >
                  Beach volleyball
                </option>
                <option
                  className="tt-suggestion tt-selectable"
                  value={"Bodyweight exercises (moderate effort)"}
                >
                  Bodyweight exercises (moderate effort)
                </option>
                <option
                  className="tt-suggestion tt-selectable"
                  value={"Bodyweight exercises (vigorous effort)"}
                >
                  Bodyweight exercises (vigorous effort)
                </option>
                <option
                  className="tt-suggestion tt-selectable"
                  value={"Boxing"}
                >
                  Boxing
                </option>
                <option
                  className="tt-suggestion tt-selectable"
                  value={"Cycling (fast)"}
                >
                  Cycling (fast)
                </option>
                <option
                  className="tt-suggestion tt-selectable"
                  value={"Cycling (moderate)"}
                >
                  Cycling (moderate)
                </option>
                <option
                  className="tt-suggestion tt-selectable"
                  value={"Cycling (slow)"}
                >
                  Cycling (slow)
                </option>
                <option
                  className="tt-suggestion tt-selectable"
                  value={"Football"}
                >
                  Football
                </option>
                <option className="tt-suggestion tt-selectable" value={"Golf"}>
                  Golf
                </option>
                <option
                  className="tt-suggestion tt-selectable"
                  value={"Gymnastics"}
                >
                  Gymnastics
                </option>
                <option
                  className="tt-suggestion tt-selectable"
                  value={"Hiking"}
                >
                  Hiking
                </option>
                <option
                  className="tt-suggestion tt-selectable"
                  value={"Jumping rope (fast)"}
                >
                  Jumping rope (fast)
                </option>
                <option
                  className="tt-suggestion tt-selectable"
                  value={"Jumping rope (moderate)"}
                >
                  Jumping rope (moderate)
                </option>
                <option
                  className="tt-suggestion tt-selectable"
                  value={"Jumping rope (slow)"}
                >
                  Jumping rope (slow)
                </option>
                <option
                  className="tt-suggestion tt-selectable"
                  value={
                    "Martial arts (jiu-jitsu, judo, karate, kickboxing, taekwondo)"
                  }
                >
                  Martial arts (jiu-jitsu, judo, karate, kickboxing, taekwondo)
                </option>
                <option
                  className="tt-suggestion tt-selectable"
                  value={"Pilates"}
                >
                  Pilates
                </option>
                <option
                  className="tt-suggestion tt-selectable"
                  value={"Race walking"}
                >
                  Race walking
                </option>
                <option
                  className="tt-suggestion tt-selectable"
                  value={"Racquetball"}
                >
                  Racquetball
                </option>
                <option
                  className="tt-suggestion tt-selectable"
                  value={"Rock climbing"}
                >
                  Rock climbing
                </option>
                <option className="tt-suggestion tt-selectable" value={"Rugby"}>
                  Rugby
                </option>
                <option
                  className="tt-suggestion tt-selectable"
                  value={"Running"}
                >
                  Running
                </option>

                <option
                  className="tt-suggestion tt-selectable"
                  value={"Ski exercise machine"}
                >
                  Ski exercise machine
                </option>
                <option
                  className="tt-suggestion tt-selectable"
                  value={"Skiing"}
                >
                  Skiing
                </option>
                <option
                  className="tt-suggestion tt-selectable"
                  value={"Soccer"}
                >
                  Soccer
                </option>
                <option
                  className="tt-suggestion tt-selectable"
                  value={"Stair climber machine"}
                >
                  Stair climber machine
                </option>
                <option
                  className="tt-suggestion tt-selectable"
                  value={"Stationary cycling (light effort)"}
                >
                  Stationary cycling (light effort)
                </option>
                <option
                  className="tt-suggestion tt-selectable"
                  value={"Stationary cycling (moderate effort)"}
                >
                  Stationary cycling (moderate effort)
                </option>
                <option
                  className="tt-suggestion tt-selectable"
                  value={"Stationary cycling (vigorous effort)"}
                >
                  Stationary cycling (vigorous effort)
                </option>
                <option
                  className="tt-suggestion tt-selectable"
                  value={"Stationary rowing (light effort)"}
                >
                  Stationary rowing (light effort)
                </option>
                <option
                  className="tt-suggestion tt-selectable"
                  value={"Stationary rowing (moderate effort)"}
                >
                  Stationary rowing (moderate effort)
                </option>
                <option
                  className="tt-suggestion tt-selectable"
                  value={"Stationary rowing (vigorous effort)"}
                >
                  Stationary rowing (vigorous effort)
                </option>
                <option
                  className="tt-suggestion tt-selectable"
                  value={"Stretching"}
                >
                  Stretching
                </option>
                <option
                  className="tt-suggestion tt-selectable"
                  value={"Surfing (body or board)"}
                >
                  Surfing (body or board)
                </option>
                <option
                  className="tt-suggestion tt-selectable"
                  value={"Swimming (backstroke)"}
                >
                  Swimming (backstroke)
                </option>
                <option
                  className="tt-suggestion tt-selectable"
                  value={"Swimming (breaststroke)"}
                >
                  Swimming (breaststroke)
                </option>
                <option
                  className="tt-suggestion tt-selectable"
                  value={"Swimming (butterfly)"}
                >
                  Swimming (butterfly)
                </option>
                <option
                  className="tt-suggestion tt-selectable"
                  value={"Swimming (freestyle, fast effort)"}
                >
                  Swimming (freestyle, fast effort)
                </option>
                <option
                  className="tt-suggestion tt-selectable"
                  value={"Swimming (freestyle, moderate effort)"}
                >
                  Swimming (freestyle, moderate effort)
                </option>
                <option
                  className="tt-suggestion tt-selectable"
                  value={"Table tennis"}
                >
                  Table tennis
                </option>
                <option
                  className="tt-suggestion tt-selectable"
                  value={"Tai chi"}
                >
                  Tai chi
                </option>
                <option
                  className="tt-suggestion tt-selectable"
                  value={"Tennis"}
                >
                  Tennis
                </option>
                <option
                  className="tt-suggestion tt-selectable"
                  value={"Volleyball"}
                >
                  Volleyball
                </option>
                <option
                  className="tt-suggestion tt-selectable"
                  value={"Walking (brisk)"}
                >
                  Walking (brisk)
                </option>
                <option
                  className="tt-suggestion tt-selectable"
                  value={"Walking (moderate)"}
                >
                  Walking (moderate)
                </option>
                <option
                  className="tt-suggestion tt-selectable"
                  value={"Walking (slow)"}
                >
                  Walking (slow)
                </option>
                <option
                  className="tt-suggestion tt-selectable"
                  value={"Walking (very brisk)"}
                >
                  Walking (very brisk)
                </option>
                <option
                  className="tt-suggestion tt-selectable"
                  value={"Water aerobics"}
                >
                  Water aerobics
                </option>
                <option
                  className="tt-suggestion tt-selectable"
                  value={"Water polo"}
                >
                  Water polo
                </option>
                <option
                  className="tt-suggestion tt-selectable"
                  value={"Weightlifting (moderate effort)"}
                >
                  Weightlifting (moderate effort)
                </option>
                <option
                  className="tt-suggestion tt-selectable"
                  value={"Weightlifting (vigorous effort)"}
                >
                  Weightlifting (vigorous effort)
                </option>
                <option
                  className="tt-suggestion tt-selectable"
                  value={"Wrestling"}
                >
                  Wrestling
                </option>
                <option className="tt-suggestion tt-selectable" value={"Yoga"}>
                  Yoga
                </option>
              </select> */}

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
