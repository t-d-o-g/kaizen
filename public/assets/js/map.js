let map; let infowindow;
const markers = [];
const info = [];
const infowindows = [];

// Define initialize map Function
function initialize_map() {
  map = new google.maps.Map(document.getElementById('map-container'), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 6,
  });


  // importing data: for testing purpose only, will eventually get data from server
  //-------------------------------------------------------
  const script = document.createElement('script');
  script.src = 'assets/js/complaint_GeoJSONP.js';
  document.getElementsByTagName('head')[0].appendChild(script);

  window.complaintfeed_callback = function (results) {
    for (var i = 0; i < results.features.length; i++) {
      const coords = results.features[i].geometry.coordinates;
      const latLng = new google.maps.LatLng(coords[1], coords[0]);
      const marker = new google.maps.Marker({
        position: latLng,
        map,
        data: results.features[i],
      });
      inforwindowContent = `${'<div class = "info_content">'
                                 + '<h3>'}${results.features[i].description.title}</h3>`
                                 + `<p id = "issue">${results.features[i].description.content}</p>`
                                 + '<p>' + `status: ${results.features[i].description.status}</p>`
                                 + '<button type="button" class="btn btn-primary" id = "update">Review</button>';
      '</div>';
      infowindow = new google.maps.InfoWindow({
        content: inforwindowContent,
        maxWidth: 200,
      });

      markers.push(marker);
      infowindows.push(infowindow);
      info.push(results.features[i].properties.name);
    }
    console.log(markers);
    for (var i = 0; i < markers.length; i++) {
      (function (markers, i) {
        google.maps.event.addListener(markers[i], 'click', function (event) {
          console.log(this.data.description);
          infowindows[i].open(map, markers[i]);

          $('#update').on('click', () => {
            const content = $('#issue').text();
            console.log(content);
          });
        });
      }(markers, i));
    }
    console.log($('update'));
    console.log($('<p>'));
    // $("#update").on("click", function(){
    //     var content = $("<p>").text();
    //     console.log(content);
    // })
  };


  //-----------------------------------------------------------

  // Try HTML 5 GeoLocation
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      map.setCenter(pos);
    }, () => {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation
    ? 'Error: The Geolocation service failed.'
    : 'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}

// Initialize maps
google.maps.event.addDomListener(window, 'load', initialize_map);
