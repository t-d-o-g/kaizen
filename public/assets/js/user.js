$(document).ready(function() {
    // blogContainer holds all of our posts
    console.log("hehehehehehehehehehe");
    var blogContainer = $(".user-container");
    var userId;
    // Click events for the edit and delete buttons
    
    
      //  userId = url.split("=")[1];
       
   
        userId = "/?user_id=" + 1;
  
        
        $.get("/api/ticketxrefs" + userId, function(data) {
          console.log("Tickets", data);
          tickets = data;
          if (!tickets || !tickets.length) {
            // alertEmpty();
            //console.log("no tickets yet");
           
          }
          else {
            
            //console.log(tickets);
            blogContainer.text(tickets);
            console.log("dsjhfsdjhfsjdhfhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
          }
        });
  
 
  
  
  
  

  
  
  
   
  });
  
























function getTickets(user) {
   
  }
