import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import {
  getGeoQuiz,
  selectGeoQueue,
  selectGeoTrace,
} from "../../app/features/geolocationQuizSlice";
import { selectResultResult } from "../../app/features/resultSlice";
import Questions from "../../components/Questions";
import { MoveNextQuestion, MovePrevQuestion } from "../../hooks/useMoveAction";

import { PushAnswer } from "../../hooks/setResult";

function Quiz() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const trace = useSelector(selectGeoTrace);
  const queue = useSelector(selectGeoQueue);
  const results = useSelector(selectResultResult);
  const [check, setChecked] = useState(null);
  useEffect(() => {
    // dispatch(getGeoQuiz());
    console.log(trace, queue, results);
  }, [trace, queue, results]);

  /** next button event handler */
  function onNext() {
    if (trace < queue.length) {
      // update the trace value by one
      dispatch(MoveNextQuestion());
      console.log(check);
      dispatch(PushAnswer(check));
    }
  }

  /** Prev button event handler */
  function onPrev() {
    if (trace > 0) {
      dispatch(MovePrevQuestion());
    }
  }

  function onChecked(check) {
    setChecked(check);
    console.log(check);
  }

  // finish quiz after the last question
  if (results?.length >= queue?.length) {
    return <Navigate to={"/geoquiz/results"} replace={true}></Navigate>;
  }

  return (
    <div className="quiz">
      <div className="quiz__container">
        <h1>Quiz Application</h1>

        <Questions onChecked={onChecked} />

        <div className="quiz__button">
          <button className="btn prev" onClick={onPrev}>
            Prev
          </button>
          <button className="btn next" onClick={onNext}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Quiz;
