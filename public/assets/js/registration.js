$(document).ready(() => {

  const url = window.location.search;
  console.log('here000000000000000000000000000000000');

 
  const fname = $('#fname');
  const lname = $('#lname');
  const email = $('#email');
  const password = $('#password');
  const username = $('#username');

  

  // Adding an event listener for when the form is submitted
  $('#registration').on('submit', (event) => {
   // event.preventDefault();
   
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
    $.post('/api/user-registration/', User, () => {
      //   window.location.href = "/registration";
      console.log('user added');
      getMapPage();
    });
   
   
  }


  // Update a given post, bring user to the blog page when done
});

function getMapPage() {
  $.get('/',() => {
    console.log('tickets added');
  });
}