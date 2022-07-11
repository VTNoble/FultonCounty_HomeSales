// call data and print to console
d3.json("samples.json").then(function(data) {

    console.log(data.names);

    // build drop down by id (names hold all ids)
    for (i = 0; i < data.names.length; i++) {
        // select the select tag
        let dropdown = d3.select('#selDataset')
        // append new option
        newOption = dropdown.append('option')
        // add ID number as text
        newOption.text(data.names[i])
        newOption.attr('value', data.names[i])

      }
      // declare variables for samples and metadatas from json file
      const samples = data.samples
      const metadata = data.metadata

      // call initial dataset to display on first load
      buildTable(metadata[0])
      barChart(samples[0])
      gaugeChart(metadata[0])
      bubbleChart(samples[0])
    });

// build MetaData chart function
function buildTable(metadata) {
  console.log("buildTable func is being executed")
  console.log(metadata)
  // declare variable on selection where we are inputting table data
  let demoTable = d3.select('#sample-metadata');
  // clear html
  demoTable.html('')
  //  begin populating table
  let fillTable = demoTable.append("table")
  // add new row in table
  let row = fillTable.append('tr')
  // add table data to new row
  let tableData = row.append('td')
  // display "ID: XXX" within td tag
  let id = tableData.text('SAMPLE: ' + metadata.id)
  // add new row in table
  row = fillTable.append('tr')
  // add table data to new row
  tableData = row.append('td')
  // display "Age: XXX" within td tag
  let age = tableData.text('AGE: ' + metadata.age)
  // add new row in table
  row = fillTable.append('tr')
  // add table data to new row
  tableData = row.append('td')
  // display "Ethnicity: XXX" within td tag
  let ethnicity = tableData.text('ETHNICITY: ' + metadata.ethnicity)
  // add new row in table
  row = fillTable.append('tr')
  // add table data to new row
  tableData = row.append('td')
  // display "Gender: XXX" within td tag
  let gender = tableData.text('GENDER: ' + metadata.gender)
  // add new row in table
  row = fillTable.append('tr')
  // add table data to new row
  tableData = row.append('td')
  // display "Location: XXX" within td tag
  let location = tableData.text('LOCATION: ' + metadata.location)
  // add new row in table
  row = fillTable.append('tr')
  // add table data to new row
  tableData = row.append('td')
  // display "bb type: XXX" within td tag
  let bbtype = tableData.text('BB TYPE: ' + metadata.bbtype)
  // add new row in table
  row = fillTable.append('tr')
  // add table data to new row
  tableData = row.append('td')
  // display "wash freq: XXX" within td tag
  let wfreq = tableData.text('WASH FREQ: ' + metadata.wfreq)

}

// function to build pieChart
function barChart(sample) {
  console.log('barChart is running')
  // console.log(sample.otu_ids.slice(0, 10))
  // console.log(sample.sample_values.slice(0, 10))
  console.log(sample)

  // assign variables and slice to grab only the top 10 values
  let topTenValues = sample.sample_values.slice(0, 10).reverse()
  let topTenIDs = sample.otu_ids.slice(0, 10).reverse().map(function (data) {return `OTU ${data}`})
  let topTenLabels = sample.otu_labels.slice(0, 10).reverse()

  var data = [{
    title: '<b>Top 10 OTUs',
    type: 'bar',
    x: topTenValues,
    y: topTenIDs,
    orientation: 'h',
    text: topTenLabels
  }];

  Plotly.newPlot('bar', data);

}

// function to build gauge chart
function gaugeChart(metadata) {
  console.log('gaugeChart is running')
  console.log(metadata)

  let wash_freq = metadata.wfreq
  console.log(wash_freq)

  var g_data = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: wash_freq,
      title: { text: "<b>Washing Frequency</b><br>Scrubs per Week" },
      type: "indicator",
      mode: "gauge+number",
      gauge: {
        bar: { color: 'red' },
        axis: { range: [0, 9], ticks: 9 },
        steps: [
          { range: [0, 1], color: '#CCFFCC' },
          { range: [1, 2], color: '#99FF99' },
          { range: [2, 3], color: '#66FF66' },
          { range: [3, 4], color: '#33FF33' },
          { range: [4, 5], color: '#00FF00' },
          { range: [5, 6], color: '#00CC00' },
          { range: [6, 7], color: '#009900' },
          { range: [7, 8], color: '#006600' },
          { range: [8, 9], color: '#003300' },
        ]
      }
    }
  ];
  
  var g_layout = { width: 500, height: 400, margin: { t: 0, b: 0 } };

  Plotly.newPlot('gauge', g_data, g_layout);

}

// function to build bubble chart
function bubbleChart(sample) {
  console.log('bubbleChart is running')
  console.log(sample)

  var trace1 = {
    x: sample.otu_ids,
    y: sample.sample_values,
    text: sample.otu_labels,
    mode: 'markers',
    marker: {
      color: sample.otu_ids,
      size: sample.sample_values,
      colorscale: 'Portland'
    }
  };
  
  var data = [trace1];
  
  var layout = {
    title: 'Belly Button Bacteria',
    xaxis: {title: 'OTU IDs'},
    yaxis: {title: 'Sample Values'},
    showlegend: false,
    height: 600,
    width: 1200
  };
  
  Plotly.newPlot('bubble', data, layout);
}

// function for when dataset is changed on selector
d3.select('#selDataset').on('change', () => { 
  
  console.log('Dropdown was changed')
  let id = d3.select('#selDataset').node().value
  console.log(id)

  // json call to re-access data
  d3.json("samples.json").then(function(data) {
    // look for sample that has the id we selected from drop down
    let newSample = data.samples.filter((sample) => {return sample.id == id;})
    console.log(newSample)
    barChart(newSample[0])
    bubbleChart(newSample[0])
    
    // look for metadata that has the id we selected from drop down
    let newMeta = data.metadata.filter((metadata) => {return metadata.id == id;})
    console.log(newMeta)
    buildTable(newMeta[0])
    gaugeChart(newMeta[0])
  })
})