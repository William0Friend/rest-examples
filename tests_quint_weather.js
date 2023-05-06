// Define a test module for fetchWeather function
QUnit.module("Fetch Weather Tests", function (hooks) {

    // Execute a function before each test case in this module
    hooks.beforeEach(function () {
  
      // Create a mock fetch function to avoid making actual API calls
      globalThis.fetch = async (url) => {
        return {
          ok: true, // Simulate a successful HTTP response
          json: async () => ({
            // Return a mock JSON response with sample data
            count: 1,
            list: [
              {
                name: "Test City",
                sys: { country: "US" },
                main: { temp: 20, humidity: 50 },
                weather: [{ description: "clear sky" }],
                wind: { speed: 2 },
                coord: { lat: 40, lon: -74 },
              },
            ],
          }),
        };
      };
  
      // Create a mock initMap function to prevent it from being called during tests
      globalThis.initMap = () => {};
    });
  
    // Define a test case for when city input is empty
    QUnit.test("fetchWeather should call showError when city input is empty", function (assert) {
  
      // Use Sinon.js to create a spy for the showError function
      const showErrorSpy = sinon.spy(showError);
  
      // Set the city input value to an empty string
      document.getElementById("city").value = "";
  
      // Call the fetchWeather function
      fetchWeather();
  
      // Check if the showError function was called once
      assert.ok(showErrorSpy.calledOnce, "showError is called when city input is empty");
    });
  
    // Add more test cases for the fetchWeather function here
      // Test case for successful weather data retrieval and display
  QUnit.test("fetchWeather should display weather data when API call is successful", async function (assert) {
    const done = assert.async();
    const showWeatherSpy = sinon.spy(showWeather);

    // Set a sample city input value
    document.getElementById("city").value = "Test City";

    // Call the fetchWeather function
    await fetchWeather();

    // Check if the showWeather function was called once
    assert.ok(showWeatherSpy.calledOnce, "showWeather is called when API call is successful");

    // Check if the weather information is displayed correctly
    const weatherInfo = document.getElementById("weather-info");
    assert.ok(weatherInfo.innerHTML.includes("Test City"), "City name is displayed correctly");
    assert.ok(weatherInfo.innerHTML.includes("20°C"), "Temperature is displayed correctly");
    assert.ok(weatherInfo.innerHTML.includes("clear sky"), "Weather description is displayed correctly");
    assert.ok(weatherInfo.innerHTML.includes("50%"), "Humidity is displayed correctly");
    assert.ok(weatherInfo.innerHTML.includes("2 m/s"), "Wind speed is displayed correctly");

    done();
  });

  // Test case for when the API call returns no cities
  QUnit.test("fetchWeather should call showError when no cities are found", async function (assert) {
    const done = assert.async();
    const showErrorSpy = sinon.spy(showError);

    // Modify the mock fetch function to return an empty city list
    globalThis.fetch = async (url) => {
      return {
        ok: true,
        json: async () => ({
          count: 0,
          list: [],
        }),
      };
    };

    // Set a sample city input value
    document.getElementById("city").value = "Invalid City";

    // Call the fetchWeather function
    await fetchWeather();

    // Check if the showError function was called once
    assert.ok(showErrorSpy.calledOnce, "showError is called when no cities are found");

    done();
  });

  // Test case for when the API call returns an error
  QUnit.test("fetchWeather should call showError when API call returns an error", async function (assert) {
    const done = assert.async();
    const showErrorSpy = sinon.spy(showError);

    // Modify the mock fetch function to return an error response
    globalThis.fetch = async (url) => {
      return {
        ok: false,
        json: async () => ({
          message: "API call error",
        }),
      };
    };

    // Set a sample city input value
    document.getElementById("city").value = "Error City";

    // Call the fetchWeather function
    await fetchWeather();

    // Check if the showError function was called once
    assert.ok(showErrorSpy.calledOnce, "showError is called when API call returns an error");

    done();
  });
  });