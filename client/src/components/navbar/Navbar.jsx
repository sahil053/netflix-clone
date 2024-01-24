import { ArrowDropDown, Notifications, Search } from "@material-ui/icons";
import "./navbar.scss";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { logoutStart } from "../../authContext/AuthActions";
import { AuthContext } from "../../authContext/AuthContext";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { dispatch } = useContext(AuthContext);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  // console.log(isScrolled);
  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
      <div className="container">
        <div className="left">
          <Link to="/" className="Link">
            <img
              src="https://cdn.worldvectorlogo.com/logos/netflix-4.svg"
              alt=""
            />
          </Link>
          <Link to="/" className="Link">
            <span>Homepage</span>
          </Link>
          <Link to="/series" className="Link">
            <span className="navbarmainLinks">Series</span>
          </Link>
          <Link to="/movies" className="Link">
            <span className="navbarmainLinks">Movies</span>
          </Link>

          <span>New and Popular</span>
          <span>My List</span>
        </div>
        <div className="right">
          <Search className="icon" />
          <span>KID</span>
          <Notifications className="icon" />

          <img
            src="https://i.pinimg.com/564x/1b/a2/e6/1ba2e6d1d4874546c70c91f1024e17fb.jpg"
            alt=""
          />
          <div className="profile">
            <ArrowDropDown className="icon" />
            <div className="options">
              <span>Settings</span>
              <span onClick={() => dispatch(logoutStart())}>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
