 // function to create color breaks
 function getColor(d) {
    return d > 750000 ? '#006d2c' :
        d > 500000  ? '#31a354' : 
        d > 300000   ? '#74c476' : 
        d > 200000   ? '#a1d99b' : 
        d > 100000   ? '#c7e9c0' : 
                    '#FFFFFF';
}


 // declare map object
 var map = L.map('map').setView([33.799837439886055, -84.41356284230015], 9);

 // declare open street map tiles
 var tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
     maxZoom: 19,
     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

// add legend
var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend');
    var grades = [0, 100000, 200000, 300000, 500000, 750000];
    var labels = [];
    var from, to;

    for (var i = 0; i < grades.length; i++) {
        from = grades[i];
        to = grades[i + 1];

        labels.push(
            '<i style="background:' + getColor(from + 1) + '"></i> <strong>$' +
            from.toLocaleString("en-US") + (to ? '&ndash;$' + to.toLocaleString("en-US") : '+')+'</strong>');
    }

    div.innerHTML = labels.join('<br>');
    return div;
};

legend.addTo(map);

    
function createMap(){

    // function to style the individual blocks
    function style(feature) {
        let year = parseInt(d3.select('#selDataset').property("value"))
        let salesData = feature.properties.sales.filter(d => {
            return d.sale_year == year
        })[0]

            return {
                fillColor: getColor(salesData.sale_price),
                weight: 0.75,
                opacity: 1,
                color: 'black',
                dashArray: '',
                fillOpacity: 0.6
            };
    }

    // BEGIN THE INTERACTIVE PORTION OF THE MAP!
    function highlightFeature(e) {
		var layer = e.target;

		layer.setStyle({
			weight: 2,
			color: '#000000',
			dashArray: '',
			fillOpacity: 0.9
		});

		if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
			layer.bringToFront();
		}

	}

	var mapLayer;

	function resetHighlight(e) {
		mapLayer.resetStyle(e.target);
	}

	function zoomToFeature(e) {
		map.fitBounds(e.target.getBounds());
	}

	function onEachFeature(feature, layer) {
        let year = parseInt(d3.select('#selDataset').property("value"))
        let salesData = feature.properties.sales.filter(d => {
            return d.sale_year == year
        })[0]
        data = 'Median Home Sales Price: ' + salesData.sale_price.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        })
		layer.on({
			mouseover: highlightFeature,
			mouseout: resetHighlight,
			click: zoomToFeature
		});
        layer.bindTooltip( data,
                {sticky: true,
                interactive: true,
                opacity: 1}  
            );

	}
    

    
    // get the data to display on the map
    url = "/api/v1.0/chloropleth"
    d3.json(url).then(function(data) {

        console.log(data);
        

        mapLayer = L.geoJson(data, {
            style: style, 
            onEachFeature: onEachFeature
        }).addTo(map)
        
        
    })

    // add map attribution
    map.attributionControl.addAttribution('Source: <a href="https://qpublic.schneidercorp.com/Application.aspx?App=FultonCountyGA&Layer=Parcels&PageType=Search">Fulton County Public Records</a>');

    

}

// initialize the page
createMap();

// event listener for dropdown
d3.select('#selDataset').on('change', () => {
    console.log('event listener was clicked')
    createMap()
    createBar()
    createLine()
})