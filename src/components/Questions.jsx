import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import {
  selectGeoQuiz,
  selectGeoQueue,
  selectGeoTrace,
} from "../app/features/geolocationQuizSlice";

function Questions({ onChecked }) {
  const queue = useSelector(selectGeoQueue);
  const trace = useSelector(selectGeoTrace);
  const [checked, setChecked] = useState(undefined);
  const [answer, setAnswer] = useState("");
  const [initialQueue, setInitialQueue] = useState(undefined);
  const ref = useRef(null);

  // let initialQueue = queue[trace];

  useEffect(() => {
    setInitialQueue(queue[trace]);
    onChecked(answer);
  }, [answer, onChecked, queue, trace]);

  console.log(initialQueue);

  return (
    <div className="questions">
      <h2>{initialQueue?.question}</h2>
      <input
        ref={ref}
        type={"text"}
        onChange={(e) => setAnswer(e.target.value)}
        value={answer}
      />
    </div>
  );
}

export default Questions;
