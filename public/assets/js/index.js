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
    // const loginLinks = '<p><a href="/registration">Register</a> | <a href="/login">Login</a> </p>';
    const loginLinks = '<p><a href="/login">Login/Register</a> </p>';
    $('#login-links').append(loginLinks);
  }

  $('#login-links').on('click', () => {
    deleteCookie('kaizen72441_uuid');
    location.reload();
  });
});
