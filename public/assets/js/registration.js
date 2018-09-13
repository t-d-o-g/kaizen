$(document).ready(() => {
  const url = window.location.search;

  const fname = $('#fname');
  const lname = $('#lname');
  const email = $('#email');
  const password = $('#password');
  const username = $('#username');

  getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop().split(';').shift();
    }
    return undefined;
  };

  deleteCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
  };

  const uuid = getCookie('kaizen72441_uuid');

  if (uuid) {
    const ticketLink = '<h2><a href="/createTicket.html">Improve It!</a><h2>';
    const logoutLink = '<p><a href="#">Logout</a>';
    $('#ticket-link').append(ticketLink);
    $('#login-links').append(logoutLink);
  } else {
    const loginLinks = '<p><a href="/login">Login</a> </p>';
    $('#login-links').append(loginLinks);
  }


  // Adding an event listener for when the form is submitted
  $('#registration').on('submit', (event) => {
    event.preventDefault();

    if (!fname.val().trim() || !username.val().trim() || !email.val().trim() || !password.val().trim()) {
      return;
    }

    const newUser = {
      first_name: fname.val().trim(),
      last_name: lname.val().trim(),
      email: email.val().trim(),
      username: username.val(),
      password: password.val().trim(),
    };

    console.log(newUser);


    submitUser(newUser);
  });


  function submitUser(User) {
    $.post('/api/user-registration/', User, (resp) => {
      //   window.location.href = "/registration";
      console.log('user added');
      // getMapPage();
      document.cookie = `kaizen72441_uuid=${resp.uuid}`;
      window.location = '/';
    });
  }


  // Update a given post, bring user to the blog page when done
});
