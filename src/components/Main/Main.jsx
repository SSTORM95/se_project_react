import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
// import { defaultClothingItems } from "../../utils/constants";
import { useMemo, useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../Contexts/CurrentTemperatureUnitContext";

function Main({ weatherData, handleCardClick, clothingItems, onCardLike }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const temp = weatherData?.temperature?.[currentTemperatureUnit] || 90;

  const getWeatherType = useMemo(() => {
    if (currentTemperatureUnit === "F") {
      if (temp >= 86) {
        return "hot";
      } else if (temp >= 66 && temp < 86) {
        return "warm";
      } else {
        return "cold";
      }
    } else if (currentTemperatureUnit === "C") {
      if (temp >= 30) {
        return "hot";
      } else if (temp >= 19 && temp < 30) {
        return "warm";
      } else {
        return "cold";
      }
    }
  }, [weatherData]);

  const filteredCards = clothingItems.filter((item) => {
    return item.weather === getWeatherType;
  });

  return (
    <main>
      <WeatherCard
        weatherData={temp}
        currentTemperatureUnit={currentTemperatureUnit}
      />
      <section className="cards">
        <p className="cards__text">
          Today is {temp}&deg;{currentTemperatureUnit} / You may want to wear:
        </p>
        <ul className="cards__list">
          {filteredCards.map((item) => {
            return (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={handleCardClick}
                clothingItems={clothingItems}
                onCardLike={onCardLike}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
