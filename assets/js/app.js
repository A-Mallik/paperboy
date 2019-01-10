window.onload = function() {
    $( "#search-form" ).submit(function( event ) {
        
        event.preventDefault();
        console.log("You searched for " + $("#search-query").val().trim())
      });

}
