//
// $("#search-query")
//
// $.getJSON('https://en.wikipedia.org/api/rest_v1/page/summary/' + topic, function(data) {       // wikipedia api to get a summary based on button already created or new buttons added
//          info = data.extract;
//          console.log(info);
//          $("#summ").html(info); //where the summary is shown on the page
// });


window.onload = function() {

  //Function to load events on this day on load
  function wikiOnLoad() {
    var mm = moment().format("MM")
    var dd = moment().format("DD")
    var queryURL="https://en.wikipedia.org/api/rest_v1/feed/onthisday/all/" + mm + "/" + dd
    $(".wiki-title").html("<i class='fab fa-wikipedia-w'></i> <span class='wiki-day'>On This Day...</span>")
    $.getJSON(queryURL, function(data) {       // wikipedia api to get a summary based on button already created or new buttons added
                 info = data.selected;
                 console.log(data)
                 console.log(info);
                 var numArticles=10
                 var wikiTable = $("<table class='table table-hover'>")
                 var wikiTbody= $("<tbody>")
                 wikiTbody.attr("id", "wiki-cards")
                 $(".wiki-section").empty();
                 if (info.length < 10) {
                   numArticles=info.length
                 }
                 for (i=0;i<numArticles;i++) {
                   var year = info[i].year;
                   var title = info[i].text;
                   var url = info[i].pages[0].content_urls.desktop.page
                   var wikiCard = $('<tr id=' + url + '><td><h6>' + year + '</h6><p>' + title + '</p></td></tr>');
                  $(wikiTbody).append(wikiCard);
                 }
                 $(wikiTable).append(wikiTbody)
                 $(".wiki-section").append(wikiTable)
                //  $("#wikiInfo").html(info); //where the summary is shown on the page
  });
};

wikiOnLoad()

    $( "#search-form" ).submit(function( event ) {
        event.preventDefault();
        console.log("You searched for " + $("#search-query").val().trim())
        $(".wiki-title").html("<i class='fab fa-wikipedia-w'></i>")
        $.getJSON('https://en.wikipedia.org/api/rest_v1/page/summary/' + $("#search-query").val().trim(), function(data) {       // wikipedia api to get a summary based on button already created or new buttons added
                 info = data.extract;
                 console.log("info: " + info);
                 var wikiInfo = $("<p>")
                 wikiInfo.addClass("card-text")
                 wikiInfo.attr("id", "wikiInfo")
                 $(wikiInfo).html(info); //where the summary is shown on the page
                 $(".wiki-section").empty();
                 $(".wiki-section").append(wikiInfo)

        });






      // =====================Reddit API==========================================

      var queryURL = "https://api.reddit.com/search?q=" + $("#search-query").val().trim(); // set limit to 10

      $.ajax({
        url: queryURL,
        method: "GET"
      })
        .then(function(response) {
          $('.reddit_cards').empty();
            var results = response.data;
            console.log(results);                    //put response in a variable
            if(($("#search-query").val().trim()) != ""){
              $('.reddit_cards').empty();
            for(var i =0; i < 25; i++){
              var title=results.children[i].data.title;
              var url=results.children[i].data.url;

              var image=results.children[i].data.thumbnail;
              if(image === "default" || image === "self"){
              image = "assets/images/reddit-logo.svg"
            }

              var redditCard = $('<tr id=' + url + '><td><h6><a href="' + url + '"target="_blank">' + title + '</a></h6><p>' + " " + '</p></td><td class="d-flex justify-content-end"><img class="placeholder" src=' + image +' ></td></tr>');
              $('.reddit_cards').append(redditCard);


            }

          } // if statement

          else{
            console.log("yes");
          }

              console.log(results.children[14].data.url);
        });


        // =====================Reddit API==========================================
        });

        var queryURL = "https://api.reddit.com/r/UpliftingNews"; // set limit to 10

        $.ajax({
          url: queryURL,
          method: "GET"
        })
          .then(function(response) {
            $('.reddit_cards').empty();
              var results = response.data;
              console.log(results);                    //put response in a variable
              // if(($("#search-query").val().trim()) != ""){
                $('.reddit_cards').empty();
              for(var i =0; i < 25; i++){
                var title=results.children[i].data.title;
                var url=results.children[i].data.url;
                var image=results.children[i].data.thumbnail;
                var date= moment.unix(results.children[i].data.created_utc).fromNow()
                if(image === "" || image === "self"){
                image = "assets/images/reddit-logo.svg"
              }

                var redditCard = $('<tr id=' + url + '><td><h6><a href="' + url + '"target="_blank">' + title + '</a></h6>' + '<span class="date-text">' + date + '</span><p>' + " " + '</p></td><td class="d-flex justify-content-end"><img class="placeholder" src=' + image +' ></td></tr>');
                $('.reddit_cards').append(redditCard);


              }

            // } // if statement

            // else{
            //   console.log("yes");
            // }

                console.log(results.children[14].data.url);
          });

}
