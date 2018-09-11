$(document).ready(() => {
  // Getting jQuery references to the ticket category, ticket itslef,  form, category and user select
  const categorySelect = $('#category');
  const ticketInput = $('#ticket');
  const statusSelect = $('#status');
  const userSelect = $('#user');
  const cmsForm = $('#cms');

  // var bodyInput = $("#body");
  // var titleInput = $("#title");
  // var cmsForm = $("#cms");
  // var authorSelect = $("#author");
  // Adding an event listener for when the form is submitted
  $(cmsForm).on('submit', handleFormSubmit);
  // Gets the part of the url that comes after the "?" (which we have if we're updating a ticket)
  const url = window.location.search;
  let ticketXrefId;
  let categoryId;
  let ticketId;
  let ticketLocationId;
  let statusId;
  let userId;
  // Sets a flag for whether or not we're updating a ticket to be false initially
  let updating = false;

  // If we have this section in our url, we pull out the ticket id from the url
  // In '?ticket_id=1', ticketId is 1
  if (url.indexOf('?ticketXref_id=') !== -1) {
    ticketXrefId = url.split('=')[1];
    getTicketData(ticketXrefId, 'ticket');
  }
  // Otherwise if we have an author_id in our url, preset the author select box to be our Author
  else if (url.indexOf('?author_id=') !== -1) {
    authorId = url.split('=')[1];
  }

  // Getting the Category, Status and Users related
  getCategory();
  getStatus();
  getUsers();

  // A function for handling what happens when the form to create a new post is submitted
  function handleFormSubmit(event) {
    event.preventDefault();
    // Wont submit the ticket if we are missing a category, ticket, status or user
    if (!ticketInput.val().trim() || !categorySelect.val() || !statusSelect.val() || !userSelect.val()) {
      return;
    }
    // Constructing a new Ticket and new TicketXref object to hand to the database
    const newTicketXref = {
      CategoryId: categorySelect.val(),
      StatusId: statusSelect.val(),
      TicketLocationId: ticketLocationId,
      TicketId: ticketId,
      UserId: userSelect.val(),
    };

    const newTicket = {
      ticket: ticketInput
        .val()
        .trim(),
    };

    // If we're updating a ticket run update function
    // Otherwise run submit function
    if (updating) {
      newTicketXref.id = ticketXrefId;
      newTicket.id = ticketId;
      updateTicketXref(newTicketXref);
      updateTicket(newTicket);
    } else {
      submitTicket(newTicket);
    }
  }

  // Submits a new ticket and brings user to home page upon completion
  function submitTicket(Ticket) {
    // TODO: Add TicketLocation to db on submit
    // it is temporarily hardcoded to fake data.
    $.post('/api/tickets', Ticket, (data) => {
      const ticketXref = {
        CategoryId: categorySelect.val(),
        StatusId: statusSelect.val(),
        TicketLocationId: '5',
        TicketId: data.id,
        UserId: userSelect.val(),
      };

      submitTicketXref(ticketXref);
    });
  }

  // Submits a new ticketxrefs and brings user to home page upon completion
  function submitTicketXref(TicketXref) {
    $.post('/api/ticketxrefs', TicketXref, () => {
      window.location.href = '/';
    });
  }

  // Gets post data for the current post if we're editing, or if we're adding to an author's existing posts
  function getTicketData(id, type) {
    let queryUrl;
    switch (type) {
      case 'ticket':
        queryUrl = `/api/ticketxrefs/${id}`;
        break;
      case 'user':
        queryUrl = `/api/users/${id}`;
        break;
      default:
        return;
    }
    $.get(queryUrl, (data) => {
      if (data) {
        console.log(data);
        // If this ticket exists, prefill our cms forms with its data
        ticketInput.val(data.Ticket.ticket);
        categoryId = data.CategoryId;
        ticketId = data.TicketId;
        ticketLocationId = data.TicketLocationId;
        statusId = data.StatusId;
        userId = data.UserId;
        console.log(userId);
        // If we have a post with this id, set a flag for us to know to update the post
        // when we hit submit
        updating = true;
      }
    });
  }

  // A function to get Category and then render list of Category
  function getCategory() {
    $.get('/api/category', renderCategoryList);
  }
  // Function to either render a list of categorys, or if there are none, direct the user to the page
  // to creat a category first
  function renderCategoryList(data) {
    if (!data.length) {
      window.location.href = '/category';
    }
    // $(".hidden").removeClass("hidden");
    const rowsToAdd = [];
    for (let i = 0; i < data.length; i++) {
      rowsToAdd.push(createCategoryRow(data[i]));
    }
    categorySelect.empty();
    console.log(rowsToAdd);
    console.log(categorySelect);
    categorySelect.append(rowsToAdd);
    categorySelect.val(categoryId);
  }

  // Creates the category options in the dropdown
  function createCategoryRow(ticketCategory) {
    const listOption = $('<option>');
    listOption.attr('value', ticketCategory.id);
    listOption.text(ticketCategory.category);
    return listOption;
  }

  // A function to get Status and then render list of Status
  function getStatus() {
    $.get('/api/status', renderStatusList);
  }
  // Function to either render a list of status, or if there are none, direct the user to the page
  // to creat a status first
  function renderStatusList(data) {
    if (!data.length) {
      window.location.href = '/status';
    }
    // $(".hidden").removeClass("hidden");
    const rowsToAdd = [];
    for (let i = 0; i < data.length; i++) {
      rowsToAdd.push(createStatusRow(data[i]));
    }
    statusSelect.empty();
    console.log(rowsToAdd);
    console.log(statusSelect);
    statusSelect.append(rowsToAdd);
    statusSelect.val(statusId);
  }

  // Creates the status options in the dropdown
  function createStatusRow(ticketStatus) {
    const listOption = $('<option>');
    listOption.attr('value', ticketStatus.id);
    listOption.text(ticketStatus.status);
    return listOption;
  }

  // A function to get Users and then render our list of Users
  function getUsers() {
    $.get('/api/users', renderUserList);
  }
  // Function to either render a list of users, or if there are none, direct the user to the page
  // to register an user first
  function renderUserList(data) {
    if (!data.length) {
      window.location.href = '/registration';
    }
    $('.hidden').removeClass('hidden');
    const rowsToAdd = [];
    for (let i = 0; i < data.length; i++) {
      rowsToAdd.push(createUserRow(data[i]));
    }
    userSelect.empty();
    console.log(rowsToAdd);
    console.log(userSelect);
    userSelect.append(rowsToAdd);
    userSelect.val(userId);
  }

  // Creates the user options in the dropdown
  function createUserRow(user) {
    const listOption = $('<option>');
    listOption.attr('value', user.id);
    listOption.text(`${user.first_name} ${user.last_name}`);
    return listOption;
  }

  // Update a given ticketxref, bring user to the blog page when done
  function updateTicketXref(TicketXref) {
    $.ajax({
      method: 'PUT',
      url: '/api/ticketXrefs',
      data: TicketXref,
    })
      .then(() => {
        window.location.href = '/';
      });
  }

  function updateTicket(Ticket) {
    $.ajax({
      method: 'PUT',
      url: '/api/tickets',
      data: Ticket,
    })
      .then(() => {
        window.location.href = '/';
      });
  }
});
