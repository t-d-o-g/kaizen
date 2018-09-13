/* eslint-env jquery */

$(() => {
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
