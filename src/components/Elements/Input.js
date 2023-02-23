/* eslint-disable eqeqeq */
import { useRef, useState, useContext, useEffect } from "react";
import { useGesture } from "@use-gesture/react";
import { FormContext } from "../../lib/FormContext";

function Input() {
  // const [crop, setCrop] = useState({ x: 0, y: 0, scale: 1 });
  const { handleChange } = useContext(FormContext);
  const [wordInput, setWordInput] = useState(false);
  // console.log(fieldsPosX, fieldsPosY, fieldsWidth, fieldsHeight);

  useEffect(() => {
    if (type === "INPUT_NUM") {
      type = "number";
    } else if (type === "INPUT_WORD") {
      setWordInput(true);
      type = "text";
    } else if (type === "INPUT_PARA") {
      type = "text";
    }
  }, [type]);

  // console.log('currentId:: ', currentId);
  // console.log(`input id:: - input-text${id}`);
  // console.log('curretValue', currentValue);

  return (
    <div>
      <input
        onClick={(e) => handleChange(e)}
        id={`input-text${id}`}
        name="test"
        // value={currentId == `input-text${id}` ? currentValue : null}
        type={"text"}
      />
    </div>
  );
}

export default Input;
