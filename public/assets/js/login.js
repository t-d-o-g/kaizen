/* eslint-env jquery */

$(() => {
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
    const loginLinks = '<p><a href="/registration">Register</a> </p>';
    $('#login-links').append(loginLinks);
  }

  $('#login').on('submit', (evt) => {
    evt.preventDefault();

    const uidPwd = {
      username: $('#login-username').val().trim(),
      password: $('#login-password').val().trim(),
    };

    // VIK_TODO: Instead of alert do it in better way
    if (uidPwd.username === '' || uidPwd.password === '') {
      alert("Username or password can't be empty");
      return;
    }

    $.post('/api/login', uidPwd, (resp) => {
      if (resp !== 'failed') {
        document.cookie = `kaizen72441_uuid=${resp.uuid}`;
        window.location = '/';
      } else {
        // VIK_TODO: Do it without alert
        alert('Username or password is incorrect. Please try again');
      }
    });
  });
});
