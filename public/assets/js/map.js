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
  let tickets;

  // The code below handles the case where we want to get all tickets for a specific user
  // Looks for a query param in the url for user_id
  const url = window.location.search;
  let userId;
  if (url.indexOf('?user_id=') !== -1) {
    userId = url.split('=')[1];
    getTickets(userId);
  }
  // If there's no ticketId we just get all tickets as usual
  else {
    getTickets();
  }

  // This function grabs tickets from the database and updates the view
  function getTickets(user) {
    userId = user || '';
    if (userId) {
      userId = `/?user_id=${userId}`;
    }
    $.get(`/api/ticketxrefs${userId}`, (data) => {
      console.log('Tickets', data);
      tickets = data;
      if (!tickets || !tickets.length) {
        // alertEmpty();
        // console.log("no tickets yet");
      } else {
        initializeMarkers();
        initializeEvents();
        // console.log(tickets);
      }
    });
  }

  // InitializeRows markers
  function initializeMarkers() {
    for (let i = 0; i < tickets.length; i++) {
      const coords = tickets[i].TicketLocation.location.coordinates;
      const latLng = new google.maps.LatLng(coords[0], coords[1]);
      const marker = new google.maps.Marker({
        position: latLng,
        map,
        data: tickets[i],
      });

      inforwindowContent = `${'<div class = "info_content">'
                                 + '<h3>Category: '}${tickets[i].Category.category}</h3>`
                                 + `<b>User</b>: ${tickets[i].User.username
                                 }<p id = "issue">` + `<b>Description</b>: ${tickets[i].Ticket.ticket}</p>`
                                 + '<p>' + `<b>Status</b>: ${tickets[i].Status.status}</p>`
                                 + '<button type="button" class="btn btn-primary" id = "update">Review</button>';
      +'</div>';
      infowindow = new google.maps.InfoWindow({
        content: inforwindowContent,
        maxWidth: 200,
      });

      markers.push(marker);
      infowindows.push(infowindow);
    }
  }

  function initializeEvents() {
    for (let i = 0; i < markers.length; i++) {
      (function (markers, i) {
        google.maps.event.addListener(markers[i], 'click', function (event) {
          console.log(this.data.Ticket.ticket);
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
    alert('There is no tickets related yet');
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
