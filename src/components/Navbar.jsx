// import "./Navbar.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
// import MenuItem from "@mui/material/MenuItem";
// import Avatar from "@mui/material/Avatar";
// import { deepOrange } from "@mui/material/colors";
// import Select from "@mui/material/Select";
// import { useLogout } from "../hooks/useLogout";
// import { selectUserAuth } from "../app/features/AuthContext";

const Navbar = () => {
  return (
    <header>
      <nav>
        <Link to={"/"}>Home</Link>
      </nav>
    </header>
  );
};

export default Navbar;
