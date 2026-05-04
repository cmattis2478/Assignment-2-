let chart;

async function lookupStock() {
  let ticker = document.getElementById('ticker').value;
  const API_KEY = "DDEnB2xTUnCaoWhTVIf2uVLzsDNfgGc8";

  let res = await fetch(`https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/2024-01-01/2024-03-01?apiKey=${API_KEY}`);
  let data = await res.json();

  let labels = data.results.map(d => new Date(d.t).toLocaleDateString());
  let prices = data.results.map(d => d.c);

  if (chart) chart.destroy();

  chart = new Chart(document.getElementById('chart'), {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: ticker,
        data: prices
      }]
    }
  });
}

// Reddit 
fetch('https://apewisdom.io/api/v1.0/filter/all-stocks/page/1')
  .then(res => res.json())
  .then(data => {
    let table = document.getElementById('stockTable');

    data.results.slice(0,5).forEach(stock => {
      let row = `
        <tr>
          <td><a href="https://finance.yahoo.com/quote/${stock.ticker}" target="_blank">${stock.ticker}</a></td>
          <td>${stock.mentions}</td>
          <td>${stock.sentiment}</td>
          <td>${stock.upvotes > 1 ? '🐂' : '🐻'}</td>
        </tr>
      `;
      table.innerHTML += row;
    });
  });