import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  selectGeoQuiz,
  selectGeoQueue,
  selectGeoTrace,
} from "../app/features/geolocationQuizSlice";

function Questions() {
  const queue = useSelector(selectGeoQueue);
  const trace = useSelector(selectGeoTrace);
  const [checked, setChecked] = useState(undefined);
  const [answer, setAnswer] = useState(null);

  let initialQueue = queue[trace];

  useEffect(() => {
    // console.log(question)
  });
  function onSelect() {
    // console.log('radio button change')
  }

  return (
    <div className="questions">
      <h2>{initialQueue?.question}</h2>
      <input
        type={"text"}
        onChange={(e) => setAnswer(e.target.value)}
        value={answer}
      />
    </div>
  );
}

export default Questions;
