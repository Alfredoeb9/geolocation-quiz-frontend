import "./Navbar.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import Select from "@mui/material/Select";
import { Menu } from "@mui/material";
import { useLogout } from "../hooks/useLogout";
import { selectUserAuth } from "../app/features/AuthContext";

const Navbar = () => {
  const user = useSelector(selectUserAuth);
  const { logout2 } = useLogout();

  const handleClick = () => {
    console.log("logout controller clicked");
    logout2();
  };

  return (
    <header className="nav">
      <div className="nav__container">
        <Link to={"/welcome"}>
          <h1>Geolocation Quiz</h1>
        </Link>

        <nav>
          <MenuItem style={{ padding: "0px" }}>
            <Link to="/">
              {/* <Avatar sx={{ bgcolor: deepOrange[500] }}></Avatar> */}
              <span className="">Home</span>
            </Link>
          </MenuItem>
          {user ? (
            <div>
              {/* <span>{user && user.email}</span> */}
              <Avatar sx={{ bgcolor: deepOrange[500] }}>
                {user?.email?.charAt(0)}
                <Select
                  labelId="profile-dropDown"
                  // id="demo-simple-select"
                  // value={age}
                  label="profile-dropDown"
                  // onChange={handleChange}
                >
                  <MenuItem>
                    <Link to="/profile">
                      <Avatar sx={{ bgcolor: deepOrange[500] }}></Avatar>
                      <span className="">{user && user.email}</span>
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to="/results">
                      <Avatar sx={{ bgcolor: deepOrange[500] }}></Avatar>
                      <span className="">My Results</span>
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <span onClick={handleClick}>Log out</span>
                  </MenuItem>
                </Select>
              </Avatar>
            </div>
          ) : (
            <div>
              <Link to="/login">login</Link>
              <Link to="/signup">signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
