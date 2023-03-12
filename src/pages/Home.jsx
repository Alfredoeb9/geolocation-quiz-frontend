import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { resetAllAction } from "../app/features/geolocationQuizSlice";
import { resetResult } from "../app/features/resultSlice";
import "./Home.css";

function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetAllAction());
    dispatch(resetResult());
  });
  return (
    <div className="home">
      <div id="box"></div>
      <div className="stars"></div>
      <div className="twinkling"></div>
      <div className="clouds"></div>

      <div className="products">
        <div className="products__challenges">
          <Link to={"/geoquiz"}>Challenges</Link>
        </div>
        <div className="products__challenges">
          <Link to={"/geoquiz"}>Facts and Stats</Link>
        </div>
        <div className="products__challenges">
          <Link to={"/geoquiz"}>Map</Link>
        </div>
        <div className="products__challenges">
          <Link to={"/"}>Coming Up</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
