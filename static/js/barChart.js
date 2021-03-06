// Fetch data from JSON
async function fetchbarJSON() {
  let url = '/api/v1.0/monthly_sales';
  let response = await fetch(url);
  // loads waiting to complete the request...
  let datapoints = await response.json();
  return datapoints;
};

function createBar(){

  fetchbarJSON().then(datapoints => {
    let year = parseInt(d3.select('#selDataset').property("value"));
    filteredData = datapoints.filter(function(item){
      return item.sale_year == year
    })
    console.log(filteredData)
    let month = filteredData.map(function(index){
      return index.sale_month;
    })
    let totalSales = filteredData.map(function(index){
      return index.sale_price;
    })

    let data = {
      labels: month,
      datasets: [{
        label: 'Total Home Sales',
        data: totalSales,
        backgroundColor: "#0000FF",
      }]
    };

    let config = {
      type: 'bar',
      data: data,
      options: {
        layout: {
          padding: 10
        },
        scales: {
          y: {
            title: {
              display: true,
              text: 'Total Home Sales'
            },
            suggestedMin: 0,
            suggestedMax: 2500
          }
        }
      }
    };

    let barChartStatus = Chart.getChart("barChart"); // <canvas> id
    if (barChartStatus != undefined) {
      barChartStatus.destroy();
      };

    let barChart = new Chart(
      document.getElementById('barChart'),
      config
    );
  })
}

// initalize the page
createBar()