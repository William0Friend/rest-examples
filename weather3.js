//forcast
const apiKey = 'b9f8e9f9149a07239a5653bb118bdb77';

async function fetchWeather() {
    const city = document.getElementById('city').value;
    if (city === '') {
        displayError('Please enter a city name.');
        return;
    }

    try {
        // Fetch current weather data
        const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const currentWeatherResponse = await fetch(currentWeatherUrl);
        const currentWeatherData = await currentWeatherResponse.json();
        displayWeatherInfo(currentWeatherData);

        // Fetch 5-day weather forecast
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
        const forecastResponse = await fetch(forecastUrl);
        const forecastData = await forecastResponse.json();
        displayWeatherForecast(forecastData);

    } catch (error) {
        displayError('Failed to fetch weather data. Please try again later.');
    }
}

function displayWeatherInfo(weatherData) {
    const weatherInfo = document.getElementById('weather-info');
    const infoHTML = `
        <h2>${weatherData.name}</h2>
        <p>Temperature: ${weatherData.main.temp}°C</p>
        <p>Weather: ${weatherData.weather[0].description}</p>
    `;
    weatherInfo.innerHTML = infoHTML;
}

function displayWeatherForecast(forecastData) {
    const forecastDiv = document.getElementById('weather-forecast');
    let forecastHTML = '<h2 class="mt-4">5-Day Forecast</h2>';

    forecastData.list.forEach((forecast, index) => {
        if (index % 8 === 0) { // Display one forecast per day
            const date = new Date(forecast.dt * 1000);
            forecastHTML += `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${date.toDateString()}</h5>
                        <p class="card-text">Temperature: ${forecast.main.temp}°C</p>
                        <p class="card-text">Weather: ${forecast.weather[0].description}</p>
                    </div>
                </div>
            `;
        }
    });

    forecastDiv.innerHTML = forecastHTML;
}

function displayError(message) {
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = message;
}

//maps
async function fetchWeatherAndLocation() {
    const city = document.getElementById('city').value;
    if (city) {
      // Fetch weather data
      await fetchWeather(city);
  
      // Display location on the map
      initMap(city);
    }
}

// Initialize the Google Map with the given city
function initMap(city) {
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: { lat: -34.397, lng: 150.644 },
  });

  const geocoder = new google.maps.Geocoder();
  geocodeAddress(geocoder, map, city);
}

// Geocode the city and update the map center
function geocodeAddress(geocoder, map, city) {
  geocoder.geocode({ address: city }, (results, status) => {
    if (status === 'OK') {
      map.setCenter(results[0].geometry.location);
      new google.maps.Marker({
        map: map,
        position: results[0].geometry.location,
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}
