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

function GeoQuizResults() {
  const dispatch = useDispatch();

  const {
    geoQuiz: { queue, answers },
    results: { result, userId },
  } = useSelector((state) => state);

  // useEffect(() => {
  //   console.log(earnPoints);
  // });

  const totalPoints = queue.length * 10;
  const attempts = attempts_Number(result);
  const earnPoints = earnPoints_Number(result, answers, 10);
  const flag = flagResult(totalPoints, earnPoints);

  async function postResults() {
    const resultData = {
      result,
      username: userId,
      attempts,
      points: earnPoints,
      achived: flag ? "Passed" : "Failed",
    };
    try {
      // if (result !== [] && !userId) throw new Error("Couldn't get Result");
      // console.log("data posted", resultData);
      await postResultData(
        `http://localhost:4000/api/result`,
        resultData,
        (data) => data
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
      <h1 className="title text-light">Quiz Application</h1>

      <div className="geoResults__result flex-center">
        <div>
          <span>Username</span>
          {/* <span className="bold">{userId || ""}</span> */}
        </div>
        <div>
          <span>Total Quiz Points : </span>
          <span className="bold">{totalPoints || 0}</span>
        </div>
        <div>
          <span>Total Questions : </span>
          <span className="bold">{queue.length || 0}</span>
        </div>
        <div>
          <span>Total Attempts : </span>
          <span className="bold">{attempts || 0}</span>
        </div>
        <div>
          <span>Total Earn Points : </span>
          <span className="bold">{earnPoints || 0}</span>
        </div>
        <div>
          <span>Quiz Result</span>
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

      <div className="container">
        {/* result table */}
        <GeoQuizTable></GeoQuizTable>
      </div>
    </div>
  );
}

export default GeoQuizResults;
