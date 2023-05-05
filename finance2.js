// Existing fetchStockData, displayStockInfo, and displayError functions

// 1. Historical Stock Prices
async function fetchHistoricalData() {
    const symbol = document.getElementById('symbol').value;
    const apiKey = 'XTVAACZ2LR4C9FGM';
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      displayHistoricalData(data);
    } catch (error) {
      displayError('Failed to fetch historical data. Please try again later.');
    }
  }
  
  function displayHistoricalData(data) {
    const historicalDataDiv = document.getElementById('historical-data');
    // Display historical data here (e.g., create a chart or table)
    // ...
  }
  
  // 2. Technical Indicators
  async function fetchTechnicalIndicator() {
    const symbol = document.getElementById('symbol').value;
    const apiKey = 'XTVAACZ2LR4C9FGM';
    const url = `https://www.alphavantage.co/query?function=SMA&symbol=${symbol}&interval=daily&time_period=10&series_type=open&apikey=${apiKey}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      displayTechnicalIndicator(data);
    } catch (error) {
      displayError('Failed to fetch technical indicator. Please try again later.');
    }
  }
  
  function displayTechnicalIndicator(data) {
    const technicalIndicatorDiv = document.getElementById('technical-indicator');
    // Display technical indicator data here (e.g.,
  // Display technical indicator data here (e.g., create a chart or table)
  // ...
}

// 3. Sector Performance
async function fetchSectorPerformance() {
  const apiKey = 'XTVAACZ2LR4C9FGM';
  const url = `https://www.alphavantage.co/query?function=SECTOR&apikey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    displaySectorPerformance(data);
  } catch (error) {
    displayError('Failed to fetch sector performance. Please try again later.');
  }
}

function displaySectorPerformance(data) {
  const sectorPerformanceDiv = document.getElementById('sector-performance');
  // Display sector performance data here (e.g., create a chart or table)
  // ...
}

// 4. Exchange Rate
async function fetchExchangeRate() {
  const apiKey = 'XTVAACZ2LR4C9FGM';
  const url = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=JPY&apikey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    displayExchangeRate(data);
  } catch (error) {
    displayError('Failed to fetch exchange rate. Please try again later.');
  }
}

function displayExchangeRate(data) {
  const exchangeRateDiv = document.getElementById('exchange-rate');
  // Display exchange rate data here (e.g., create a chart or table)
  // ...
}

// 5. Cryptocurrency Data
async function fetchCryptoData() {
  const apiKey = 'XTVAACZ2LR4C9FGM';
  const url = `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=BTC&market=USD&apikey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    displayCryptoData(data);
  } catch (error) {
    displayError('Failed to fetch cryptocurrency data. Please try again later.');
  }
}

function displayCryptoData(data) {
    const cryptoDataDiv = document.getElementById('crypto-data');
    const metaData = data['Meta Data'];
    const timeSeriesData = data['Time Series (Digital Currency Daily)'];
  
    const tableHeader = `
      <tr>
        <th>Date</th>
        <th>Open (USD)</th>
        <th>High (USD)</th>
        <th>Low (USD)</th>
        <th>Close (USD)</th>
        <th>Volume</th>
        <th>Market Cap (USD)</th>
      </tr>
    `;
  
    let tableRows = '';
  
    for (const date in timeSeriesData) {
      const dailyData = timeSeriesData[date];
      const row = `
        <tr>
          <td>${date}</td>
          <td>${dailyData['1a. open (USD)']}</td>
          <td>${dailyData['2a. high (USD)']}</td>
          <td>${dailyData['3a. low (USD)']}</td>
          <td>${dailyData['4a. close (USD)']}</td>
          <td>${dailyData['5. volume']}</td>
          <td>${dailyData['6. market cap (USD)']}</td>
        </tr>
      `;
      tableRows += row;
    }
  
    const tableHTML = `
      <table class="table table-bordered table-striped">
        <thead>${tableHeader}</thead>
        <tbody>${tableRows}</tbody>
      </table>
    `;
  
    cryptoDataDiv.innerHTML = tableHTML;
  }

// 6. Batch Stock Quotes
async function fetchBatchStockQuotes() {
  const apiKey = 'XTVAACZ2LR4C9FGM';
  const symbols = ['MSFT', 'AAPL', 'GOOGL'].join(',');
  const url = `https://www.alphavantage.co/query?function=BATCH_STOCK_QUOTES&symbols=${symbols}&apikey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    displayBatchStockQuotes(data);
  } catch (error) {
    displayError('Failed to fetch batch stock quotes. Please try again later.');
  }
}

function displayBatchStockQuotes(data) {
  const batchStockQuotesDiv = document.getElementById('batch-stock-quotes');
  // Display batch stock quotes data here (e.g., create a chart or table)
  // ...
}
