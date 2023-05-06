// A function to fetch weather data from OpenWeatherMap
// define a function fetchWeather() to fetch weather data from OpenWeatherMap.
async function fetchWeather() {
    // get the value of the "city" input element from the DOM.
    const city = document.getElementById("city").value;
  
    // define my OpenWeatherMap API key.
    const apiKey = "b9f8e9f9149a07239a5653bb118bdb77";
  
    // create the API request URL with the city name, API key, and metric units.
    const url = `https://api.openweathermap.org/data/2.5/find?q=${city}&appid=${apiKey}&units=metric`;
  
    // check if the city input is empty, and if so, show an error message and return.
    if (city === "") {
      alert("Please enter a city name, you left input blank");
      return;
    }
  
    // try to fetch the weather data from the API.
    try {
      // fetch the data from the API using the URL.
      const response = await fetch(url);
  
      // parse the JSON data from the response.
      const data = await response.json();
  
      // check if the response is OK (status code 200-299).
      if (response.ok) {
        // check if there are cities in the response data.
        if (data.count > 0) {
          // call showWeather() with the cities data and initMap as a callback.
          showWeather(data.list, initMap);
        } else {
          // If no cities are found, I show an error message.
              alert("No cities found with that name, please make sure you entered a legitimate city name, (100% city respresentation is not gauranteed.");
        }
      } else {
        // If the response is not OK, I show the error message from the API.
        alert(data.message);
      }
    } catch (error) {
      // If there is an error fetching the data, I show a generic error message.
      alert("Failed to fetch weather data. Please try again later.");
    }
  }
  
  
  // I define a function fetchState() to fetch state information from OpenCage.
  async function fetchState(lat, lon, apiKey) {
    // I create the API request URL with the latitude, longitude, and API key.
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${apiKey}`;
  
    // I try to fetch the state data from the API.
    try {
      // I fetch the data from the API using the URL.
      const response = await fetch(url);
  
      // I parse the JSON data from the response.
      const data = await response.json();
  
      // I check if the response is OK (status code 200-299).
      if (response.ok) {
        // I get the address components from the first result.
        const components = data.results[0].components;
  
        // I check if there is a state in the components and if the country is the US.
        if (components.state && components.country_code.toUpperCase() === "US") {
          // If so, I return the state.
          return components.state;
        }
      }
    } catch (error) {
      // If there is an error fetching the state data, I log an error message.
      console.error("Failed to fetch state information.");
      alert("Failed to fetch state information.");
    }
  
    // If there is no state information, I return an empty string.
    return "";
  }
  
  
  
  //google maps api
  //A function to display maps for each city
  // I define a function initMap() to display maps for each city.
  function initMap(cities) {
      // I loop through the cities array.
    for (let i = 0; i < cities.length; i++) {
       // I get the current city from the cities array.
       const city = cities[i];
  
       // I create a LatLng object using the latitude and longitude from the city data.
       const latLng = new google.maps.LatLng(city.coord.lat, city.coord.lon);
   
       // I define the map options with a zoom level of 10 and the LatLng as the center.
       const mapOptions = {
         zoom: 10,
         center: latLng,
       };
   
       // I create a new Google Map object with the map options and assign it to the corresponding map element in the DOM.
       const map = new google.maps.Map(document.getElementById(`map${i}`), mapOptions);
   
       // I create a new Google Maps Marker with the LatLng and assign it to the current map.
       const marker = new google.maps.Marker({
         position: latLng,
         map: map,
       });
     }
   }
   
  //A function to display weather data
  // I define a function showWeather() to display weather data for the cities.
  async function showWeather(cities, callback) {
    // I get the weather-info and error-message elements from the DOM.
    const weatherInfo = document.getElementById("weather-info");
    const errorMessage = document.getElementById("error-message");
  
    // I start building the HTML for displaying the weather information with a row div.
    let weatherHTML = '<div class="row">';
  
    // I define my OpenCage API key.
    const openCageApiKey = "68a28b83bc86495b9d6eca15799ca9d8";
  
    // I initialize a mapId variable to assign unique IDs to the map elements.
    let mapId = 0;
  
    // I loop through the cities array.
    for (const data of cities) {
      // I fetch the state information using the latitude, longitude, and OpenCage API key.
      const state = await fetchState(data.coord.lat, data.coord.lon, openCageApiKey);
  
      // I create a stateText variable that includes the state information if available.
      const stateText = state ? `, ${state}` : "";
  
       // Convert Celsius temperature to Fahrenheit
      const tempCelsius = data.main.temp;
      const tempFahrenheit = Math.round(tempCelsius * 1.8 + 32);
      // I append the weather information for the current city to the weatherHTML string.
      weatherHTML += `
        <div class="weather-city container col-12 col-md-6 col-lg-4 border border-dark  text-center ">
          <h2>${data.name}, ${data.sys.country}${stateText}</h2>
          <p>Temperature: ${tempCelsius}°C / ${tempFahrenheit}°F</p>
          <p>Weather: ${data.weather[0].description}</p>
          <p>Humidity: ${data.main.humidity}%</p>
          <p>Wind Speed: ${data.wind.speed} m/s</p>
          <div id="map${mapId}" class="map   border border-primary align-center" style="width:100%;height:200px;"></div>
        </div>
      `;
  
      // I increment the mapId variable for the next city.
      mapId++;
    }
  
    // I close the row div in the weatherHTML string.
    weatherHTML += '</div>';
  
    // I update the innerHTML of the weather-info element with the weatherHTML string.
    weatherInfo.innerHTML = weatherHTML;
  
    // I clear the innerHTML of the error-message element.
    errorMessage.innerHTML = "";
  
    // I check if a callback function is provided.
    if (callback) {
      // If so, I call the callback function with the cities array.
      callback(cities);
    }
  }
  
  
