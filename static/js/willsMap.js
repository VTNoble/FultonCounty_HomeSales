var map = L.map('map').setView([33.799837439886055, -84.41356284230015], 9);

    var tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    
function createMap(){
    

    // function to create color breaks
    function getColor(d) {
        return d > 800000 ? '#006d2c' :
            d > 500000  ? '#31a354' :
            d > 350000   ? '#74c476' :
            d > 250000   ? '#bae4b3' :
            d > 100000   ? '#edf8e9' :
                        '#FFFFFF';
    }

    // function to style the individual blocks
    function style(feature) {
        let year = parseInt(d3.select('#selDataset').property("value"))
        let salesData = feature.properties.sales.filter(d => {
            return d.sale_year == year
        })[0]
        return {
            fillColor: getColor(salesData.sale_price),
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.8
        };
    }

    url = "/api/v1.0/chloropleth"

    d3.json(url).then(function(data) {

        console.log(data);
        

        L.geoJson(data, {style: style}).addTo(map);
    })

}

// initialize the page
createMap()

// event listener for dropdown
d3.select('#selDataset').on('change', () => {
    console.log('event listener was clicked')
    createMap()
})