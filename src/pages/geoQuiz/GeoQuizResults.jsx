import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetAllAction } from "../../app/features/geolocationQuizSlice";
import { resetResult } from "../../app/features/resultSlice";
import { attempts_Number } from "../../helper/helper";
import { earnPoints_Number } from "../../helper/helper";
import { flagResult } from "../../helper/helper";
import { postResultData } from "../../hooks/usePostResult";
import "./geoQuizResults.css";

function GeoQuizResults() {
  const dispatch = useDispatch();
  const [hasPosted, setHasPosted] = useState(false);

  const {
    geoQuiz: { geoQuiz, queue, answers },
    results: { result, userId },
    user,
  } = useSelector((state) => state);

  // let cookieUser = localStorage.getItem("user");

  const totalPoints = queue.length * 10;
  const attempts = attempts_Number(result);
  const earnPoints = earnPoints_Number(result, answers, 10);
  const flag = flagResult(totalPoints, earnPoints);
  const id = geoQuiz?._id;
  const cookieUser = user?.user?.username;

  async function postResults() {
    if (!cookieUser) {
      console.log('No user found, skipping results post');
      return;
    }

    const resultData = {
      result,
      quizId: id,
      username: cookieUser,
      attempts,
      points: earnPoints,
      achived: flag ? "Passed" : "Failed",
    };
    try {
      await postResultData(
        `${process.env.REACT_APP_API_URL}/result`,
        resultData
      );
    } catch (error) {
      console.log(error);
    }
  }

  function onRestart() {
    dispatch(resetAllAction());
    dispatch(resetResult());
  }

  useEffect(() => {
    if (cookieUser && !hasPosted) {
      postResults();
      setHasPosted(true);
    }
  }, [cookieUser, hasPosted]);

  return (
    <div className="geoResults__container">
      <h1>Quiz Application Results</h1>

      <div className="geoResults__result">
        <div>
          <h4>Username:</h4> <span>{cookieUser}</span>
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
        <Link className="btn" to={"/geoquiz"} onClick={onRestart}>
          Restart
        </Link>
      </div>

      {/* <AmazonAdd /> */}

      {/* <div className="container">
        
        <GeoQuizTable />
      </div> */}
    </div>
  );
}

export default GeoQuizResults;
