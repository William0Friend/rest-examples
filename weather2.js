/*
fetchStockData is an asynchronous function that fetches stock data from the Alpha Vantage API using the given stock symbol.
The function checks if the input is empty and displays an error message if it is.
The function also checks for errors in the API response, such as an invalid stock symbol or too many requests, and displays an appropriate error message.
If the API call is successful, the displayStockInfo function is called to display the stock information on the page.
The displayError function is used to display error messages on the page.
*/

async function fetchStockData() {
    const symbol = document.getElementById('symbol').value;
    const apiKey = 'YOUR_API_KEY';
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;
  
    if (symbol === '') {
      displayError('Please enter a stock symbol.');
      return;
    }
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (data['Error Message'] || data['Note']) {
        displayError('Invalid stock symbol or too many requests. Please try again later.');
      } else {
        displayStockInfo(data['Global Quote']);
      }
    } catch (error) {
      displayError('Failed to fetch stock data. Please try again later.');
    }
  }
  
  function displayStockInfo(stockData) {
    const stockInfo = document.getElementById('stock-info');
    const infoHTML = `
      <h2>${stockData['01. symbol']}</h2>
      <p>Open: ${stockData['02. open']}</p>
      <p>High: ${stockData['03. high']}</p>
      <p>Low: ${stockData['04. low']}</p>
      <p>Price: ${stockData['05. price']}</p>
      <p>Volume: ${stockData['06. volume']}</p>
      <p>Latest Trading Day: ${stockData['07. latest trading day']}</p>
      <p>Previous Close: ${stockData['08. previous close']}</p>
      <p>Change: ${stockData['09. change']}</p>
      <p>Change Percent: ${stockData['10. change percent']}</p>
    `;
    stockInfo.innerHTML = infoHTML;
  }
  
  function displayError(message) {
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = message;
  }
  


const countriesAndCities = {
    'USA': ['New York', 'Los Angeles', 'Chicago'],
    'UK': ['London', 'Birmingham', 'Manchester'],
    // Add more countries and cities as needed
  };
  
  function populateCountries() {
    const countrySelect = document.getElementById('country');
    const countries = Object.keys(countriesAndCities);
  
    countries.forEach(country => {
      const option = document.createElement('option');
      option.value = country;
      option.text = country;
      countrySelect.appendChild(option);
    });
  }
  
  function populateCities() {
    const countrySelect = document.getElementById('country');
    const citySelect = document.getElementById('city');
    citySelect.innerHTML = '<option value="">Select City</option>';
  
    if (countrySelect.value) {
      const cities = countriesAndCities[countrySelect.value];
  
      cities.forEach(city => {
        const option = document.createElement('option');
        option.value = city;
        option.text = city;
        citySelect.appendChild(option);
      });
    }
  }
  
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
  
  // Call populateCountries when the page loads
  document.addEventListener('DOMContentLoaded', populateCountries);
  