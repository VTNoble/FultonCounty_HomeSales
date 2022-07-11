var map = L.map('map').setView([33.799837439886055, -84.41356284230015], 9);

var tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


url = "/api/v1.0/chloropleth"

d3.json(url).then(function(data) {

    console.log(data);
    L.geoJson(data).addTo(map);

})


