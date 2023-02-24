import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectGeoQueue,
  selectGeoTrace,
} from "../app/features/geolocationQuizSlice";
import { selectResultResult } from "../app/features/resultSlice";

function Questions({ onChecked, newTrace }) {
  const dispatch = useDispatch();
  const queue = useSelector(selectGeoQueue);
  const trace = useSelector(selectGeoTrace);
  const results = useSelector(selectResultResult);
  const [checked, setChecked] = useState(undefined);
  const [answer, setAnswer] = useState("");
  const [initialQueue, setInitialQueue] = useState(undefined);
  const ref = useRef(null);

  console.log("newTrace::", newTrace, "trace::", trace);

  useEffect(() => {
    setInitialQueue(queue[trace]);
    onChecked(answer);
    setChecked(checked);
  }, [answer, checked, onChecked, queue, trace]);

  // ref.current.value = "";

  return (
    <div className="questions">
      <h2>{initialQueue?.question}</h2>
      <input
        ref={ref}
        id={"answers-input"}
        type={"text"}
        onChange={(e) => setAnswer(e.target.value)}
        // value={`${trace !== newTrace ? results[trace] : answer}`}
      />
    </div>
  );
}

export default Questions;
