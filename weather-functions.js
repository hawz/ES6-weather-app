import * as ELEMENTS from './elements.js';
import { Http } from './http.js';
import { WeatherData, WEATHER_PROXY_HANDLER } from './weather-data.js';
import { config } from './config.js';

function searchWeather() {
  const CITY_NAME = ELEMENTS.ELEMENT_SEARCHED_CITY.value.trim();
  if (CITY_NAME.length === 0) {
    return alert('Please enter a city name');
  }
  ELEMENTS.ELEMENT_LOADING_TEXT.style.display = 'block';
  ELEMENTS.ELEMENT_WEATHER_BOX.style.display = 'none';
  const URL = `http://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME}&units=metric&appId=${config.APP_ID}`;
  Http.fetchData(URL)
    .then(responseData => {
      const WEATHER_DATA = new WeatherData(CITY_NAME, responseData.weather[0].description.toUpperCase());
      const WEATHER_PROXY = new Proxy(WEATHER_DATA, WEATHER_PROXY_HANDLER);
      WEATHER_PROXY.temperature = responseData.main.temp;
      updateWeather(WEATHER_PROXY);
    })
    .catch(err => {
      alert(err);
    });
}

function updateWeather(weatherData) {
  ELEMENTS.ELEMENT_WEATHER_CITY.textContent = weatherData.cityName;
  ELEMENTS.ELEMENT_WEATHER_DESC.textContent = weatherData.description;
  ELEMENTS.ELEMENT_WEATHER_TEMP.textContent = weatherData.temperature;

  ELEMENTS.ELEMENT_WEATHER_BOX.style.display = 'block';
  ELEMENTS.ELEMENT_LOADING_TEXT.style.display = 'none';
}

export { searchWeather, updateWeather };