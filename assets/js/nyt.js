$(document).ready(function() {

function nytOnLoad() {
    var queryURL="https://api.nytimes.com/svc/topstories/v2/home.json?api-key=548cf1cc9a384242a531beac63abd9f4"
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function(response) {
        // console.log(response);
        for(let i = 0; i < 10; i++) {

            var title = response.results[i].title;
            var description = response.results[i].abstract;
            var url = response.results[i].url;
            try {
                var image = response.results[i].multimedia[0].url;
            }
            catch(e) {
                console.log("hahha no thumbnail")
                var image = "assets/images/NYT_logo.jpg"
            }


            var nytCard = $('<tr id=' + url + '><td><h6>' + title + '</h6><p>' + description + '</p></td><td class="d-flex justify-content-end"><img src=' + image +' class="placeholder"></td></tr>');
            $('.nyt-cards').append(nytCard);
        }
    })
}

nytOnLoad();

function nytSearch(searchTerm) {
    queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=548cf1cc9a384242a531beac63abd9f4&sort=newest&q=" + searchTerm;
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function(response){
        // console.log(response);
        nytSearchHTML(response);
    })
}


function nytSearchHTML(response) {
    $('.nyt-cards').empty();
    if(response.response.docs.length > 0) {
        for(let i = 0; i < response.response.docs.length; i++) {

            var title = response.response.docs[i].headline.main;
            var description = response.response.docs[i].snippet;
            var url = response.response.docs[i].web_url;
            try {
                var image = "https://static01.nyt.com/" + response.response.docs[i].multimedia[2].url;
            }
            catch(e) {
                var image = "assets/images/NYT_logo.jpg"
            }


            var nytCard = $('<tr id=' + url + '><td><h6>' + title + '</h6><p>' + description + '</p></td><td class="d-flex justify-content-end"><img src=' + image +' class="placeholder"></td></tr>');
            $('.nyt-cards').append(nytCard);
        }
    } else {
        var nytCard = $('<tr><td><h6>No Results Found</h6><p>Please try searching for another news related term.</p></td><td class="d-flex justify-content-end"></td></tr>');
        $('.nyt-cards').append(nytCard);
    }
}




// $("#submit-btn").on("click", function(event) {
//     event.preventDefault();
//     searchTerm = $("#search-text").val().trim();
//     console.log(searchTerm)

//     queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=548cf1cc9a384242a531beac63abd9f4&sort=newest&q=" + searchTerm;
    
//     $.ajax({
//     url: queryURL,
//     method: 'GET',
//     }).then(function(response) {
//         console.log(response)
//         console.log(response.response.docs[0])
//     }
        
//     )
// })

$( "#search-form" ).submit(function( event ) {
    event.preventDefault();
    var searchTerm = $('#search-query').val().trim();
    nytSearch(searchTerm)
});

});