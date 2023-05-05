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
  