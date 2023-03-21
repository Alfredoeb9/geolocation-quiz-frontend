import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
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
      <Helmet>
        <title>GeographQuizWorld | Home</title>
        <meta
          name="description"
          content="Geography Quiz World coveres topics such as world geography, famous landmarks, and cultural traditions, our website provides a unique learning experience that's both informative and entertaining."
        />
      </Helmet>
      <div id="box"></div>
      <div className="stars"></div>
      <div className="twinkling"></div>
      <div className="clouds"></div>

      <div className="products">
        <div className="products__challenges">
          <Link to={"/geoquiz"}>Challenges</Link>
        </div>
        <div className="products__challenges">
          <Link to={"/facts"}>Facts and Stats</Link>
        </div>
        <div className="products__challenges">
          <Link to={"/maps"}>Map</Link>
        </div>
        <div className="products__challenges">
          <Link to={"/"}>Coming Up</Link>
        </div>
      </div>

      <span
        style={{
          color: "#fff",
          zIndex: "999",
          position: "absolute",
          bottom: "0",
        }}
      >
        Created by: <a href="https://alfredoesdesign.com/">Alfredo Barillas</a>
      </span>
    </div>
  );
}

export default Home;
