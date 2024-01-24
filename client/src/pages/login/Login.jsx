import { AuthContext } from "../../authContext/AuthContext";
import { login } from "../../authContext/apiCalls";
import "./login.scss";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { useState } from "react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = useContext(AuthContext);

  const navigate = useNavigate();
  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const res = await login({ email, password }, dispatch);
      if (res) {
        // If login is successful, redirect to the homepage or any other desired location
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleSignupClick = () => {
    // Use navigate to redirect to the "/signup" route
    navigate("/register");
  };

  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://cdn.worldvectorlogo.com/logos/netflix-4.svg"
            alt=""
          />
        </div>
      </div>
      <div className="container">
        <form>
          <h1>Sign In</h1>
          <input
            type="email"
            placeholder="Email or phone number"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="loginButton" onClick={handleLogin}>
            Sign In
          </button>
          <span>
            New to Netflix?{" "}
            <b onClick={handleSignupClick} style={{ cursor: "pointer" }}>
              Sign Up now.
            </b>
          </span>
          <small>
            This page is protected by google reCAPTCHA to ensure you're not a
            bot. <b>Learn more</b>.
          </small>
        </form>
      </div>
    </div>
  );
}
