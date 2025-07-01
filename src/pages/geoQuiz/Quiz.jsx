import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import {
  selectGeoQueue,
  selectGeoTrace,
} from "../../app/features/geolocationQuizSlice";
import { selectResultResult } from "../../app/features/resultSlice";
import Questions from "../../components/Questions";
import { MoveNextQuestion, MovePrevQuestion } from "../../hooks/useMoveAction";
import { UpdateResult } from "../../hooks/setResult";
import { PushAnswer } from "../../hooks/setResult";
import "./quiz.css";

function Quiz() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const trace = useSelector(selectGeoTrace);
  const queue = useSelector(selectGeoQueue);
  const results = useSelector(selectResultResult);
  const [check, setChecked] = useState(undefined);
  const [answer, setAnswer] = useState("");
  const [oldTrace, setOldTrace] = useState(null);

  // let newTrace;
  useEffect(() => {
    dispatch(UpdateResult({ trace, check }));
  }, [check]);

  /** next button event handler */
  function onNext() {
    // programmatically reset value
    if (trace < queue.length) {
      dispatch(MoveNextQuestion());
      if (results.length <= trace) {
        dispatch(PushAnswer(check));
      }
      // document.getElementById("answers-input").value = "";

      setOldTrace(trace);
      // newTrace = trace;
    }

    setChecked(undefined);
  }

  /** Prev button event handler */
  // function onPrev() {
  //   if (trace > 0) {
  //     dispatch(MovePrevQuestion());
  //   }
  // }

  function onChecked(check) {
    // Normalize the answer immediately when user input is captured
    const normalizedAnswer = check ? check.toLowerCase().trim() : '';
    setChecked(normalizedAnswer);
  }

  // finish quiz after the last question
  if (results?.length >= queue?.length) {
    return <Navigate to={"/geoquiz/results"} replace={true} />;
  }

  return (
    <div className="quiz">
      <div className="quiz__container">
        <h1>Quiz Application</h1>

        <Questions onChecked={onChecked} />

        {/* <div className={`check ${results[trace] == i ? "checked" : ""}`}></div> */}

        <div className="quiz__button">
          {/* {trace > 0 ? (
            <button className="btn prev" onClick={onPrev}>
              Prev
            </button>
          ) : (
            ""
          )} */}

          <button className="btn next" onClick={onNext}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Quiz;
