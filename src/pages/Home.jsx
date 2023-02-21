import "./Home.css";
import { Link } from "react-router-dom";

function Home() {
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
          <Link to={"/geoquiz"}>Challenges</Link>
        </div>
        <div className="products__challenges">
          <Link to={"/geoquiz"}>Challenges</Link>
        </div>
        <div className="products__challenges">
          <Link to={"/geoquiz"}>Challenges</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
