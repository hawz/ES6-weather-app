import * as ELEMENTS from './elements.js';
import { searchWeather } from './weather-functions.js';

ELEMENTS.ELEMENT_SEARCH_BUTTON.addEventListener('click', searchWeather);
