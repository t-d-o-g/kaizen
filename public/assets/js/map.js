let map; let infowindow;
const markers = [];
const info = [];
const infowindows = [];

// Define initialize map Function
function initialize_map() {
  map = new google.maps.Map(document.getElementById('map-container'), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 10,
  });

  // Try code getting data from server here
  //------------------------------------------------
  var tickets;

  // The code below handles the case where we want to get blog posts for a specific author
  // Looks for a query param in the url for ticket_id
  var url = window.location.search;
  var ticketId;
  if (url.indexOf("?ticket_id=") !== -1) {
    ticketId = url.split("=")[1];
    getTickets(ticketId);
  }
  // If there's no ticketId we just get all tickets as usual
  else {
    getTickets();
  }

  // This function grabs ticketss from the database and updates the view
  function getTickets(ticket) {
    ticketId = ticket || "";
    if (ticketId) {
      ticketId = "/?ticket_id=" + ticketId;
    }
    $.get("/api/tickets" + ticketId, function(data) {
      console.log("Tickets", data);
      tickets = data;
      if (!tickets || !tickets.length) {
        alertEmpty();
        //console.log("no tickets yet");
      }
      else {
        initializeMarkers();
        initializeEvents();
        //console.log(tickets);
      }
    });
  }

  // InitializeRows markers
  function initializeMarkers() {
    for (var i = 0; i < tickets.length; i++) {
      const coords = tickets[i].location.coordinates;
      const latLng = new google.maps.LatLng(coords[1], coords[0]);
      const marker = new google.maps.Marker({
        position: latLng,
        map,
        data: tickets[i],
      });

      inforwindowContent = '<div class = "info_content">'
                                 + '<h3>Title: ' + tickets[i].title +'</h3>'
                                 + '<b>Category</b>: ' + tickets[i].category
                                 + '<p id = "issue">'+ '<b>Description</b>: ' + tickets[i].description+'</p>'
                                 + '<p>' + '<b>Status</b>: '+ tickets[i].status+ '</p>'
                                 + '<button type="button" class="btn btn-primary" id = "update">Review</button>';
                                 + '</div>';
      infowindow = new google.maps.InfoWindow({
        content: inforwindowContent,
        maxWidth: 200,
      });

      markers.push(marker);
      infowindows.push(infowindow);

    }
  }

  function initializeEvents() {
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

  }

  function alertEmpty() {
    alert("There is no tickets related yet");
  }

  //----------------------------------------------------------

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

function handleLocationError(browserHasGeolocation, infowindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation
    ? 'Error: The Geolocation service failed.'
    : 'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}

// Initialize maps
google.maps.event.addDomListener(window, 'load', initialize_map);
console.log('Am i HERE NOW?');
