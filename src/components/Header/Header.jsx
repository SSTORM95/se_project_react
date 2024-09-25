import "./Header.css";
import logo from "../../images/Logo.svg";
import avatar from "../../images/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { CurrentUserContext } from "../../Contexts/CurrentUserContext ";
import { useContext } from "react";
import { Link } from "react-router-dom";

function Header({
  handleAddClick,
  weatherData,
  isLoggedIn,
  handleRegisterUser,
  handleLoginUser,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const currentUser = useContext(CurrentUserContext);

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="logo" />
      </Link>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>

      <div className="header__user-container">
        <ToggleSwitch />
        {isLoggedIn ? (
          <>
            <button
              onClick={handleAddClick}
              className="header__add-clothes-btn"
              type="button"
            >
              + Add Clothes
            </button>
            <Link to="/profile" className="header__link">
              <p className="header__username">{currentUser.name}</p>
              {currentUser.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="header__avatar"
                />
              ) : (
                <div className="header__avatar-default">
                  {currentUser?.name?.name.charAt(0).toUpperCase() || ""}
                </div>
              )}
            </Link>
          </>
        ) : (
          <div className="header__user-box">
            <button className="header__register" onClick={handleRegisterUser}>
              Sign Up
            </button>
            <button className="header__login" onClick={handleLoginUser}>
              Log in
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
