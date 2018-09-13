/* eslint-env jquery */
const markers = [];
const infoWindows = [];
let map;

function initializeMap() {
  const center = new google.maps.LatLng(40.753050, -74.011888);

  const mapOptions = {
    center,
    zoom: 10,
    // Assign a maximum value for the width of the infowindow allows
    // greater control over the various content elements
    maxWidth: 350,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapTypeControl: false,
    streetViewControl: false,
  };

  map = new google.maps.Map(document.getElementById('map-container'),
    mapOptions);

  // The code below handles the case where we want to get all tickets for a specific user
  // Looks for a query param in the url for user_id
  const url = window.location.search;
  let userId;
  if (url.indexOf('?user_id=') !== -1) {
    userId = url.split('=')[1];
    getTickets(userId);
  } else {
  // If there's no ticketId we just get all tickets as usual
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
      const tickets = data;
      if (!tickets || !tickets.length) {
      } else {
        initializeMarkers(tickets);
        initializeEvents(markers);
        initializeInfoWindow();
      }
    });
  }

  centerMap();
}

getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop().split(';').shift();
  }
  return undefined;
};
const uuid = getCookie('kaizen72441_uuid');

// InitializeRows markers
function initializeMarkers(tickets) {
  for (let i = 0; i < tickets.length; i++) {
    const coords = tickets[i].TicketLocation.location.coordinates;
    const latLng = new google.maps.LatLng(coords[0], coords[1]);
    const marker = new google.maps.Marker({
      position: latLng,
      map,
      data: tickets[i],
    });

    const addButton = uuid ? tickets[i].User.uuid == uuid : false;
    let buttonHtml = "";
    if (addButton) {
      buttonHtml = '<button type="button" class="btn btn-primary" id = "update">Review</button>';
    }

    let content = `${'<div id = "iw-container">'
                                 + '<div class="iw-title"> '}${tickets[i].Category.category}</div>`
                                 + `<b>User</b>: ${tickets[i].User.username
                                 }<p id = "issue">` + `<b>Description</b>: ${tickets[i].Ticket.ticket}</p>`
                                 + '<p>' + `<b>Status</b>: ${tickets[i].Status.status}</p>`
                                + buttonHtml;
    +'</div>';
    // content = "<p>This is a test<p>";
    infoWindow = new google.maps.InfoWindow({
      content: content,
      maxWidth: 200,
    });

    markers.push(marker);
    infoWindows.push(infoWindow);
  }
}

function initializeEvents() {
  for (let i = 0; i < markers.length; i++) {
    (function (markers, i) {
      google.maps.event.addListener(markers[i], 'click', function (event) {
        console.log(this.data.Ticket.ticket);
        const ticketXref_id = this.data.id;
        infoWindows[i].open(map, markers[i]);

        $('#update').on('click', () => {
          window.location.href = `update-ticket?ticketXref_id=${ticketXref_id}`;
          console.log(content);
        });
      });
    }(markers, i));
  }
}

function centerMap() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      map.setCenter(pos);
    }, () => {
      handleLocationError(true, map);
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, map);
  }
}

function handleLocationError(hasLocation) {
  const infoWindow = new google.maps.InfoWindow({
    maxWidth: 200,
  });
  infoWindow.setPosition(map.getCenter());
  infoWindow.setContent(hasLocation
    ? 'Error: The Geolocation service failed.'
    : 'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}

// VIK_TODO: Fix this function so we don't have the
// listener function inside the loop
// Code copied from http://en.marnoto.com/2014/09/5-formas-de-personalizar-infowindow.html
  // *
  // START INFOWINDOW CUSTOMIZE.
  // The google.maps.event.addListener() event expects
  // the creation of the infowindow HTML structure 'domready'
  // and before the opening of the infowindow, defined styles are applied.
  // *
  function initializeInfoWindow() {
    for (let i = 0; i < markers.length; i++) {
      (function (markers, i) {
   
  google.maps.event.addListener(infoWindows[i], 'domready', function() {

    // Reference to the DIV that wraps the bottom of infowindow
    var iwOuter = $('.gm-style-iw');

    /* Since this div is in a position prior to .gm-div style-iw.
     * We use jQuery and create a iwBackground variable,
     * and took advantage of the existing reference .gm-style-iw for the previous div with .prev().
    */
    var iwBackground = iwOuter.prev();

    // Removes background shadow DIV
    iwBackground.children(':nth-child(2)').css({'display' : 'none'});

    // Removes white background DIV
    iwBackground.children(':nth-child(4)').css({'display' : 'none'});

    // Moves the infowindow 115px to the right.
    // iwOuter.parent().parent().css({left: '115px'});

    // Moves the shadow of the arrow 76px to the left margin.
    iwBackground.children(':nth-child(1)').attr('style', function(i,s){ return s + 'left: 76px !important;'});

    // Moves the arrow 76px to the left margin.
    iwBackground.children(':nth-child(3)').attr('style', function(i,s){ return s + 'left: 76px !important;'});

    // Changes the desired tail shadow color.
    iwBackground.children(':nth-child(3)').find('div').children().css({'box-shadow': 'rgba(72, 181, 233, 0.6) 0px 1px 6px', 'z-index' : '1'});

    // Reference to the div that groups the close button elements.
    var iwCloseBtn = iwOuter.next();

    // Apply the desired effect to the close button
    iwCloseBtn.css({opacity: '1', right: '38px', top: '3px', border: '7px solid #48b5e9', 'border-radius': '13px', 'box-shadow': '0 0 5px #3990B9'});

    // If the content of infowindow not exceed the set maximum height, then the gradient is removed.
    if($('.iw-content').height() < 140){
      $('.iw-bottom-gradient').css({display: 'none'});
    }
  });
}(markers, i));
}
  }

// Initialize maps
google.maps.event.addDomListener(window, 'load', initializeMap);
