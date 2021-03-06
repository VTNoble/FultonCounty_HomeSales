// Fetch data from JSON
async function fetchlineJSON() {
  let url = '/api/v1.0/median';
  let response = await fetch(url);
  // loads waiting to complete the request...
  let datapoints = await response.json();
  return datapoints;
};

function createLine(){

  fetchlineJSON().then(datapoints => {
    let year = parseInt(d3.select('#selDataset').property("value"));
    filteredData = datapoints.filter(function(item){
      return item.sale_year == year
    })
    console.log(filteredData)
    let month = filteredData.map(function(index){
      return index.sale_month;
    })
    let medianPrice = filteredData.map(function(index){
      return index.sale_price;
    })

    let data = {
      labels: month,
      datasets: [{
        label: 'Median Sale Price ($)',
        backgroundColor: "#008000",
        borderColor: "#008000",
        data: medianPrice,
      }]
    };

    let config = {
      type: 'line',
      data: data,
      options: {
        layout: {
          padding: 10
        },
        scales: {
          y: {
            title: {
              display: true,
              text: 'Median Sale Price ($)'
            },
            suggestedMin: 250000,
            suggestedMax: 450000
          }
        }
      }
    };

    let lineChartStatus = Chart.getChart("lineChart"); // <canvas> id
    if (lineChartStatus != undefined) {
      lineChartStatus.destroy();
      };

    let lineChart = new Chart(
      document.getElementById('lineChart'),
      config
    );  
  })
}

// initalize the page
createLine()