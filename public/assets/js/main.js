$(".add-sushi").on("submit", function(event) {
  event.preventDefault();
  // Send the POST request.
  $.ajax("/api/sushis", {
    type: "POST",
    data: { name: $("#name").val().trim() }
  }).then(
    function() {
      location.reload();
    }
  );
});

$(".eatSushi").on("click", function(event) {
  var id = $(this).data("id");
  var customer = $("#customer").val().trim();

  $.ajax("/api/sushis/" + id, {
    type: "PUT",
    data: { 
      eaten: 1,
      myname: customer
    },

  }).then(
    function() {
      location.reload();
    }
  );
});


$(".deleteSushi").on("click", function(event) {
  var id = $(this).data("id");
  // Send the DELETE request.
  $.ajax("/api/sushis/" + id, {
    type: "DELETE",
  }).then(
    function() {
      location.reload();
    }
  );
});