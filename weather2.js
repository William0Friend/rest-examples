async function fetchWeather() {
  const city = document.getElementById("city").value;
  const apiKey = "b9f8e9f9149a07239a5653bb118bdb77"; // Replace with your OpenWeatherMap API key
  const url = `https://api.openweathermap.org/data/2.5/find?q=${city}&appid=${apiKey}&units=metric`;

  if (city === "") {
    showError("Please enter a city name");
    return;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      if (data.count > 0) {
        showWeather(data.list);
      } else {
        showError("No cities found with that name.");
      }
    } else {
      showError(data.message);
    }
  } catch (error) {
    showError("Failed to fetch weather data. Please try again later.");
  }
}

async function fetchState(lat, lon, apiKey) {
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (response.ok) {
      const components = data.results[0].components;
      if (components.state && components.country_code.toUpperCase() === "US") {
        return components.state;
      }
    }
  } catch (error) {
    console.error("Failed to fetch state information.");
  }

  return "";
}

async function showWeather(cities) {
  const weatherInfo = document.getElementById("weather-info");
  const errorMessage = document.getElementById("error-message");

  let weatherHTML = '<div class="row">'; // Add a row div
  const openCageApiKey = "68a28b83bc86495b9d6eca15799ca9d8"; //OpenCage API key

  for (const data of cities) {
    const state = await fetchState(data.coord.lat, data.coord.lon, openCageApiKey);
    const stateText = state ? `, ${state}` : "";
    weatherHTML += `
      <div class="weather-city container col-12 col-md-6 col-lg-4"> <!-- Add col-md-6 col-lg-4 classes -->
        <h2>${data.name}, ${data.sys.country}${stateText}</h2>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
      </div>
    `;
  }

  weatherHTML += '</div>'; // Close the row div
  weatherInfo.innerHTML = weatherHTML;
  errorMessage.innerHTML = "";
}

function showError(message) {
  const weatherInfo = document.getElementById("weather-info");
  const errorMessage = document.getElementById("error-message");

  weatherInfo.innerHTML = "";
  errorMessage.innerHTML = message;
}
async function fetchWeather() {
  const city = document.getElementById("city").value;
  const apiKey = "b9f8e9f9149a07239a5653bb118bdb77"; // Replace with your OpenWeatherMap API key
  const url = `https://api.openweathermap.org/data/2.5/find?q=${city}&appid=${apiKey}&units=metric`;

  if (city === "") {
    showError("Please enter a city name");
    return;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      if (data.count > 0) {
        showWeather(data.list);
      } else {
        showError("No cities found with that name.");
      }
    } else {
      showError(data.message);
    }
  } catch (error) {
    showError("Failed to fetch weather data. Please try again later.");
  }
}

async function fetchState(lat, lon, apiKey) {
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (response.ok) {
      const components = data.results[0].components;
      if (components.state && components.country_code.toUpperCase() === "US") {
        return components.state;
      }
    }
  } catch (error) {
    console.error("Failed to fetch state information.");
  }

  return "";
}

async function showWeather(cities) {
  const weatherInfo = document.getElementById("weather-info");
  const errorMessage = document.getElementById("error-message");

  let weatherHTML = '<div class="row">'; // Add a row div
  const openCageApiKey = "68a28b83bc86495b9d6eca15799ca9d8"; //OpenCage API key

  for (const data of cities) {
    const state = await fetchState(data.coord.lat, data.coord.lon, openCageApiKey);
    const stateText = state ? `, ${state}` : "";
    weatherHTML += `
      <div class="weather-city container col-12 col-md-6 col-lg-4"> <!-- Add col-md-6 col-lg-4 classes -->
        <h2>${data.name}, ${data.sys.country}${stateText}</h2>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
      </div>
    `;
  }

  weatherHTML += '</div>'; // Close the row div
  weatherInfo.innerHTML = weatherHTML;
  errorMessage.innerHTML = "";
}

function showError(message) {
  const weatherInfo = document.getElementById("weather-info");
  const errorMessage = document.getElementById("error-message");

  weatherInfo.innerHTML = "";
  errorMessage.innerHTML = message;
}
