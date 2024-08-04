import "./Header.css";
import logo from "../../images/Logo.svg";
import avatar from "../../images/avatar.png";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="logo" />
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <button
        onClick={handleAddClick}
        className="header__add-clothes-btn"
        type="button"
      >
        + Add Clothes
      </button>
      <div className="header__user-container">
        <p className="header__username">Terrance Tegegne</p>
        <img src={avatar} alt="Avatar" className="header__avatar" />
      </div>
    </header>
  );
}

export default Header;
