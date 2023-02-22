import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectGeoQueue,
  selectGeoTrace,
} from "../../app/features/geolocationQuizSlice";
import Questions from "../../components/Questions";
import { MoveNextQuestion, MovePrevQuestion } from "../../hooks/useMoveAction";

function Quiz() {
  const dispatch = useDispatch();
  const trace = useSelector(selectGeoTrace);
  const queue = useSelector(selectGeoQueue);
  useEffect(() => {
    console.log(trace, queue);
  }, [trace, queue]);

  /** next button event handler */
  function onNext() {
    if (trace < queue.length - 1) {
      // update the trace value by one
      dispatch(MoveNextQuestion());
    }
  }

  /** Prev button event handler */
  function onPrev() {
    if (trace > 0) {
      dispatch(MovePrevQuestion());
    }
  }
  return (
    <div className="quiz">
      <div className="quiz__container">
        <h1>Quiz Application</h1>

        <Questions />

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
