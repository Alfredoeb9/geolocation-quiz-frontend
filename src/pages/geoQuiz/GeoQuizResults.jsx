import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import GeoQuizTable from "../../components/GeoResultTable";
import { resetAllAction } from "../../app/features/geolocationQuizSlice";
import { resetResult } from "../../app/features/resultSlice";
import { attempts_Number } from "../../helper/helper";
import { earnPoints_Number } from "../../helper/helper";
import { useEffect } from "react";

function GeoQuizResults() {
  const dispatch = useDispatch();

  const {
    geoQuiz: { queue, answers },
    results: { result, userId },
  } = useSelector((state) => state);

  useEffect(() => {
    console.log(earnPoints);
  });

  const totalPoints = queue.length * 10;
  const attempts = attempts_Number(result);
  const earnPoints = earnPoints_Number(result, answers);

  function onRestart() {
    dispatch(resetAllAction());
    dispatch(resetResult());
  }

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
          {/* <span className="bold">{totalPoints || 0}</span> */}
        </div>
        <div>
          <span>Total Questions : </span>
          {/* <span className="bold">{queue.length || 0}</span> */}
        </div>
        <div>
          <span>Total Attempts : </span>
          {/* <span className="bold">{attempts || 0}</span> */}
        </div>
        <div>
          <span>Total Earn Points : </span>
          {/* <span className="bold">{earnPoints || 0}</span> */}
        </div>
        <div>
          <span>Quiz Result</span>
          {/* <span
            style={{ color: `${flag ? "#2aff95" : "#ff2a66"}` }}
            className="bold"
          >
            {flag ? "Passed" : "Failed"}
          </span> */}
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
