$(document).ready(() => {
  // Gets an optional query string from our url (i.e. ?post_id=23)
  const url = window.location.search;
  console.log('here000000000000000000000000000000000');

  // Getting jQuery references to the post body, title, form, and category select
  const fname = $('#fname');
  const lname = $('#lname');
  const email = $('#email');
  const password = $('#password');
  const username = $('#username');

  // Giving the postCategorySelect a default value

  // Adding an event listener for when the form is submitted
  $('#registration').on('submit', (event) => {
    event.preventDefault();
    // Wont submit the post if we are missing a body or a title
    if (!fname.val().trim() || !username.val().trim() || !email.val().trim() || !password.val().trim()) {
      return;
    }
    // Constructing a newPost object to hand to the database
    const newUser = {
      first_name: fname.val().trim(),
      last_name: lname.val().trim(),
      email: email.val().trim(),
      username: username.val(),
      password: password.val().trim(),
    };

    console.log(newUser);

    // If we're updating a post run updatePost to update a post

    submitUser(newUser);
  });

  // Submits a new post and brings user to blog page upon completion
  function submitUser(User) {
    $.post('/api/user-registration/', User, () => {
      //   window.location.href = "/registration";
      console.log('user added');
    });
  }


  // Update a given post, bring user to the blog page when done
});
