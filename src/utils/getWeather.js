import axios from "axios";

const getWeather = async (latitude, longitude) => {
  try {
    const url = `http://api.weatherstack.com/current?access_key=ed7195720506a4cd892f9a704e3e0fa9&query=${latitude},${longitude}`;
    const weatherData = await axios.get(url);
    if(weatherData.data.error) {
      return { error: weatherData.data.error.info };
    } else {
      return weatherData.data.current.weather_descriptions[0];
    }
  } catch (error) {
    return { error: 'Cannot access weather service!' };
  }
}

export { getWeather }