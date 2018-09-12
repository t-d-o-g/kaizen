let map;
let lat;
let lng;

// Getting jQuery references to the ticket category, ticket itslef,  form, category and user select
const categorySelect = $('#category');
const ticketInput = $('#ticket');
const statusSelect = $('#status');
const cmsForm = $('#cms');
const locationInput = $('#location');
let ticketLocationId;
let ticketId;

// Adding an event listener for when the form is submitted
$(cmsForm).on('submit', handleFormSubmit);

async function getData() {
  await getDbData('category');
  await getDbData('status');
}

getData();


// A function for handling what happens when the form to create a new ticket is submitted
function handleFormSubmit(event) {
  event.preventDefault();
  // Wont submit the ticket if we are missing a category, ticket, status or user
  if (!ticketInput.val().trim() || !categorySelect.val() || !statusSelect.val()) {
    return;
  }
  // Constructing a new Ticket new Location and new TicketXref object to hand to the database
  const newLocation = {
    newLat: lat,
    newLng: lng,
  };

  const newTicket = {
    ticket: ticketInput
      .val()
      .trim(),
  };

  getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop().split(';').shift();
    }
    return undefined;
  };

  const uuid = getCookie('kaizen72441_uuid');

  async function submitData() {
    await submitTicket(newTicket);
    await submitLocation(newLocation);
    const newTicketXref = {
      CategoryId: categorySelect.val(),
      StatusId: statusSelect.val(),
      TicketLocationId: ticketLocationId,
      TicketId: ticketId,
      UserId: uuid,
    };

    submitTicketXref(newTicketXref);
  }

  submitData();
}

// A function to get database Data and then render list;
var queryUrl;
var ref;
var formSelect;
var dataProperty;
async function getDbData(type) {
  switch (type) {
    case 'category':
      queryUrl = '/api/category';
      ref = 'category';
      formSelect = categorySelect;
      dataProperty = 'category';
      break;
    case 'status':
      queryUrl = '/api/status';
      ref = 'status';
      formSelect = statusSelect;
      dataProperty = 'status';
      break;
    default:
      return;
  }

  await $.get(queryUrl, renderList);
}
// Function to either render a list of database data, or if there are none, direct the user to the page
// to creat a record first
function renderList(data) {
  console.log(data);
  if (!data.length) {
    window.location.href = `/${ref}`;
  }
  // $(".hidden").removeClass("hidden");
  const rowsToAdd = [];
  for (let i = 0; i < data.length; i++) {
    rowsToAdd.push(createRow(data[i]));
  }
  formSelect.empty();
  console.log(rowsToAdd);
  console.log(formSelect);
  formSelect.append(rowsToAdd);
  formSelect.val(1);
}

// Creates the category options in the dropdown
function createRow(record) {
  const listOption = $('<option>');
  listOption.attr('value', record.id);
  listOption.text(record[dataProperty]);
  return listOption;
}

// Submits a new ticket and get the ticket id
async function submitTicket(Ticket) {
  await $.post('/api/tickets', Ticket, (data) => {
    console.log(data);
    ticketId = data.id;
  });
}

// submits a new Location and get the new location id

async function submitLocation(location) {
  await $.post('/api/locations', location, (data) => {
    console.log(data);
    ticketLocationId = data.id;
  });
}

// Submits a new ticketxrefs and brings user to home page upon completion
async function submitTicketXref(TicketXref) {
  await $.post('/api/ticketxrefs', TicketXref, (data) => {
    console.log(data);
  });
}


// Define initialize map Function
function initialize_map() {
  map = new google.maps.Map(document.getElementById('map-container'), {
    center: { lat: 40.753050, lng: -74.011888 },
    zoom: 10,
  });


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

  // This event listener will call addMarker() when the map is clicked.
  map.addListener('click', (event) => {
    addMarker(event.latLng);
  });

  // Adds a marker to the map
  function addMarker(location) {
    console.log(location);
    const marker = new google.maps.Marker({
      position: location,
      map,
    });

    lat = location.lat().toFixed(4);
    lng = location.lng().toFixed(4);
    console.log(lat);
    console.log(lng);

    const loc = `lat: ${lat} lng: ${lng}`;
    console.log(loc);
    console.log(locationInput);
    locationInput.val(loc);

    marker.addListener('click', () => {
      marker.setMap(null);
    });
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
