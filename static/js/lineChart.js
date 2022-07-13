// Fetch data from JSON
async function fetchlineJSON() {
  let url = 'http://127.0.0.1:5000/api/v1.0/median';
  let response = await fetch(url);
  // loads waiting to complete the request...
  let datapoints = await response.json();
  return datapoints;
};

function createLine() {

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
        label: 'Median Home Value ($)',
        backgroundColor: "#008000",
        borderColor: "#008000",
        data: medianPrice,
      }]
    };

    let config = {
      type: 'line',
      data: data,
      options: {}
    };

    let chartStatus = Chart.getChart("lineChart"); // <canvas> id
    if (chartStatus != undefined) {
      chartStatus.destroy();
      };

    let lineChart = new Chart(
      document.getElementById('lineChart'),
      config
    );  
  })
}

// initalize the page
createLine()

// event listener for dropdown
d3.select('#selDataset').on('change', () => {
  console.log('event listener was clicked')
  createLine()
})