// Fetch data from JSON
async function fetchJSON() {
  const url = 'http://127.0.0.1:5000/api/v1.0/median';
  const response = await fetch(url);
  // loads waiting to complete the request...
  const datapoints = await response.json();
  return datapoints;
};

fetchJSON().then(datapoints => {
  let year = parseInt(d3.select('#selDataset').property("value"));
  filteredData = datapoints.filter(function(item){
    return item.sale_year == year
  })
  console.log(filteredData)
  const month = filteredData.map(function(index){
    return index.sale_month;
  })
  const medianPrice = filteredData.map(function(index){
    return index.sale_price;
  })

  // const labels = [
  //   'January',
  //   'February',
  //   'March',
  //   'April',
  //   'May',
  //   'June',
  //   'July',
  //   'August',
  //   'September',
  //   'October',
  //   'November',
  //   'December'
  // ];

  const data = {
    labels: month,
    datasets: [{
      label: 'Median Home Value ($)',
      backgroundColor: "#008000",
      borderColor: "#008000",
      data: medianPrice,
    }]
  };

  const config = {
    type: 'line',
    data: data,
    options: {}
  };

  const lineChart = new Chart(
    document.getElementById('lineChart'),
    config
  );  
})


