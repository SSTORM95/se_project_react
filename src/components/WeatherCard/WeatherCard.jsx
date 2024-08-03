import "./WeatherCard.css"
import storm from "../../images/WeatherCard.png";


function WeatherCard() {
    return (
        <section className="weather__card">
            <p className="weather-card__temp">75&deg;F</p>
            <img src={storm} alt="storm" className="weather-card__image" />
        </section>
    )
}

export default WeatherCard;