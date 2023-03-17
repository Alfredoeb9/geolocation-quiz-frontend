import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import GeoQuizTable from "../../components/GeoResultTable";
import { resetAllAction } from "../../app/features/geolocationQuizSlice";
import { resetResult } from "../../app/features/resultSlice";
import { attempts_Number } from "../../helper/helper";
import { earnPoints_Number } from "../../helper/helper";
import { flagResult } from "../../helper/helper";
import { postResultData } from "../../hooks/usePostResult";
import "./geoQuizResults.css";

function GeoQuizResults() {
  const dispatch = useDispatch();

  const {
    geoQuiz: { geoQuiz, queue, answers },
    results: { result, userId },
    user,
  } = useSelector((state) => state);

  // useEffect(() => {
  //   console.log(earnPoints);
  // });

  console.log(user);

  let cookieUser = localStorage.getItem("user");

  const totalPoints = queue.length * 10;
  const attempts = attempts_Number(result);
  const earnPoints = earnPoints_Number(result, answers, 10);
  const flag = flagResult(totalPoints, earnPoints);
  const id = geoQuiz?._id;

  async function postResults() {
    const resultData = {
      result,
      quizId: id,
      username: JSON.parse(cookieUser).username,
      attempts,
      points: earnPoints,
      achived: flag ? "Passed" : "Failed",
    };
    try {
      // if (result !== [] && !userId) throw new Error("Couldn't get Result");
      await postResultData(
        `http://localhost:4000/api/result`,
        resultData,
        (data) => console.log(data)
      );
    } catch (error) {
      console.log(error);
    }
  }

  function onRestart() {
    dispatch(resetAllAction());
    dispatch(resetResult());
  }

  postResults();

  return (
    <div className="geoResults__container">
      <h1>Quiz Application Results</h1>

      <div className="geoResults__result">
        <div>
          <h4>Username:</h4> <span>{user.user.username}</span>
          {/* <span className="bold">{userId || ""}</span> */}
        </div>
        <div>
          <h4>Total Quiz Points: </h4>
          <span className="bold">{totalPoints || 0}</span>
        </div>
        <div>
          <h4>Total Questions: </h4>
          <span className="bold">{queue.length || 0}</span>
        </div>
        <div>
          <h4>Total Attempts: </h4>
          <span className="bold">{attempts || 0}</span>
        </div>
        <div>
          <h4>Total Earn Points: </h4>
          <span className="bold">{earnPoints || 0}</span>
        </div>
        <div>
          <h4>Quiz Result: </h4>
          <span
            style={{ color: `${flag ? "#2aff95" : "#ff2a66"}` }}
            className="bold"
          >
            {flag ? "Passed" : "Failed"}
          </span>
        </div>
      </div>

      <div className="start">
        <Link className="btn" to={"/"} onClick={onRestart}>
          Restart
        </Link>
      </div>

      {/* <div className="container">
        
        <GeoQuizTable />
      </div> */}
    </div>
  );
}

export default GeoQuizResults;
