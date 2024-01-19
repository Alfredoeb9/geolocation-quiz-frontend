/* eslint-disable eqeqeq */
import { useRef, useState, useContext, useEffect } from "react";
import { useGesture } from "@use-gesture/react";
import { FormContext } from "../../lib/FormContext";

function Input() {
  const { handleChange } = useContext(FormContext);
  const [wordInput, setWordInput] = useState(false);

  return (
    <div>
      <input
        onClick={(e) => handleChange(e)}
        id={`input-text`}
        name="test"
        type={"text"}
      />
    </div>
  );
}

export default Input;
