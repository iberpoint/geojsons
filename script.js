const searchParams = new URLSearchParams(window.location.search);
var country = searchParams.get('country');
var countries = $.ajax({
    url: "https://iberpoint.github.io/geojsons/" + country + ".json",
    dataType: "json",
    success: console.log("Country data successfully loaded."),
    error: function(xhr) {
      alert(`Countries: ${xhr.statusText}`);
    }
  });

  $.when(countries).done(function() {
    var polygonGeoJSON = countries;
  }).then(function(polygonGeoJSON){

// Initialize the map
var map = L.map('map', {
    zoomControl: false,   // Disable the default zoom control
    scrollWheelZoom: false, // Disable scroll wheel zoom
    touchZoom: false,
    dragging: false,
    attributionControl: false,
    doubleClickZoom: false    // Disable the default zoom control
}).setView([0, 0], 2);

// Clear the map of any existing layers
map.eachLayer(function (layer) {
    map.removeLayer(layer);
});

// Add GeoJSON polygon to the map
var polygonLayer = L.geoJSON(polygonGeoJSON,{
    onEachFeature: function(feature, layer) {
        if (feature.properties && feature.properties.name) {
            layer.bindPopup(feature.properties.name);
        }
    }
}).addTo(map);
map.fitBounds(polygonLayer.getBounds());
})  