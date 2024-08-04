import "./WeatherCard.css";
import storm from "../../images/WeatherCard.png";

function WeatherCard({ weatherData }) {
  return (
    <section className="weather__card">
      <p className="weather-card__temp">{weatherData.temp.F}&deg;F</p>
      <img src={storm} alt="storm" className="weather-card__image" />
    </section>
  );
}

export default WeatherCard;
