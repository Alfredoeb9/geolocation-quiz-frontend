import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectGeoQueue,
  selectGeoTrace,
} from "../app/features/geolocationQuizSlice";
import { selectResultResult } from "../app/features/resultSlice";
import { UpdateResult } from "../hooks/setResult";

function Questions({ onChecked }) {
  const dispatch = useDispatch();
  const queue = useSelector(selectGeoQueue);
  const trace = useSelector(selectGeoTrace);
  const results = useSelector(selectResultResult);
  const [checked, setChecked] = useState(undefined);
  const [answer, setAnswer] = useState("");
  const [initialQueue, setInitialQueue] = useState(undefined);
  const ref = useRef(null);

  console.log("trace::", trace);

  useEffect(() => {
    // setChecked(checked);
    setInitialQueue(queue[trace]);
    document.getElementById("answers-input").value = "";
  }, [queue, trace]);

  // useEffect(() => {
  //   dispatch(UpdateResult({ trace, check }));
  // }, [check]);
  // onChecked(answer);

  // ref.current.value = "";

  return (
    <div className="quiz__questions">
      <h2>{initialQueue?.question}</h2>
      <input
        ref={ref}
        id={"answers-input"}
        type={"text"}
        onChange={(e) => onChecked(e.target.value)}
        // value={""}
      />
    </div>
  );
}

export default Questions;
