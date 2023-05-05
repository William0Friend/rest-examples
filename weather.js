async function fetchWeather() {
    const city = document.getElementById("city").value;
    const apiKey = "b9f8e9f9149a07239a5653bb118bdb77"; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
    if (city === "") {
      showError("Please enter a city name");
      return;
    }
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (response.ok) {
        showWeather(data);
      } else {
        showError(data.message);
      }
    } catch (error) {
      showError("Failed to fetch weather data. Please try again later.");
    }
  }
  
  function showWeather(data) {
    const weatherInfo = document.getElementById("weather-info");
    const errorMessage = document.getElementById("error-message");
  
    weatherInfo.innerHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <p>Temperature: ${data.main.temp}°C</p>
      <p>Weather: ${data.weather[0].description}</p>
      <p>Humidity: ${data.main.humidity}%</p>
      <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
    errorMessage.innerHTML = "";
  }
  
  function showError(message) {
    const weatherInfo = document.getElementById("weather-info");
    const errorMessage = document.getElementById("error-message");
  
    weatherInfo.innerHTML = "";
    errorMessage.innerHTML = message;
  }