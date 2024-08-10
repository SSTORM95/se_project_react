export const getWeather = ({ latitude, longitude }, APIkey) => {
  const weatherApi = fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  });
  return weatherApi;
};

export const filterWeatherData = (data) => {
  const main = data.main;
  const temperature = main && main.temp;
  const weather = {temperature: {F: Math.round(temperature), C: Math.round((temperature - 32) * 5/9)}, city: data.name}
  return weather;
};



// weather.temperature.F = data.main.temp);
// weather.temperature.C = Math.round((data.main.temp - 32) * 5/9)};
