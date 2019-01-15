// Byron's JS
// Test comment
$(document).ready(function(){
    

    //---------------------------------------FOX NEWS API:-----------------------------------//
    // console.log('byron.js online');

    function foxNewsSearch(searchTerm) {
        var queryURL = 'https://newsapi.org/v2/top-headlines?sources=fox-news&apiKey=4158f11fae04433cb9d70983ca8857bd';
        if(searchTerm.length > 0) {
          queryURL = 'https://newsapi.org/v2/everything?q=' + searchTerm + '&sources=fox-news&apiKey=4158f11fae04433cb9d70983ca8857bd';
        } 

        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function(response){
            // console.log(response);
            foxNewsSearchHTML(response,queryURL);
            console.log("query length is " + queryURL.length)
        })
    }

    function foxNewsSearchHTML(response,q) {
        if (q.length > 93) {
            $('.fox-body').empty();
        }
        $('.fox_news_cards').empty();
        if(response.totalResults > 0) {
            console.log(response)
            for(let i = 0; i < response.articles.length; i++) {

                var foxNewsCard
                var foxNewsBigCard
                try {
                    var title = response.articles[i].title;
                    var description = response.articles[i].description;
                    var url = response.articles[i].url;
                    var image = response.articles[i].urlToImage;
                    var date = moment(response.articles[i].publishedAt).fromNow()
                }
                catch(e) {
                    var image = "assets/images/Fox_logo.jpg"
                }
                //Add another if statement to get the first result
                if(q.length === 93) {
                    if(i > 0) {
                    foxNewsCard = $('<tr id="' + url + '"><td><h6>' + title + '</h6><p>' + description + '<span class="date-text">&nbsp; &#8226; &nbsp;' + date + '</span></p></td><td class="d-flex justify-content-end"><img src="' + image +'" class="placeholder"></td></tr>');
                    $('.fox_news_cards').append(foxNewsCard);
                    } else {
                    foxNewsBigCard = $('<div class="headline"><a href="' + url + '" target="_blank"><div id="fox-headline" class="img-lg"></div><h4>' + title + '</h4></a><p class="headline-text">' + description + '<span class="date-text">&nbsp; &#8226; &nbsp;' + date + '</p></div>');
                    $('.fox-body').prepend(foxNewsBigCard);
                    $('#fox-headline').css("background-image", "url(" + image + ")");  
                    }
                } else{
                    foxNewsCard = $('<tr id="' + url + '"><td><h6>' + title + '</h6><p>' + description + '<span class="date-text">&nbsp; &#8226; &nbsp;' + date + '</span></p></td><td class="d-flex justify-content-end"><img src="' + image +'" class="placeholder"></td></tr>');
                    $('.fox_news_cards').append(foxNewsCard);
                }


                
            }
        } else {
            var foxNewsCard = $('<tr><td><h6>No Results Found</h6><p>Please try searching for another news related term.</p></td><td class="d-flex justify-content-end"></td></tr>');
            $('.fox_news_cards').append(foxNewsCard);
        }
    }

    //---------------------------------------YOUTUBE API:-----------------------------------//
    
    function youtubeSearch(searchTerm) {
        $('.youtube_cards').empty();
        // console.log(searchTerm);
        var youtubeSearchArray = ['fox news', 'nyt news', 'bbc news', 'c span', 'nbc news'];

        if(searchTerm.length < 1) {
            sort = true;
            for(let i in youtubeSearchArray)
            {
                let queryURL = "https://www.googleapis.com/youtube/v3/search";
                queryURL += '?' + $.param({
                    part: 'snippet',
                    key: 'AIzaSyBqjeZvRL_Xlr2_Fclhpr57eu3svLsSfHs',
                    q: youtubeSearchArray[i]
        
                });

                $.ajax({
                    url: queryURL,
                    method: 'GET'
                }).done(function(response){
                    // console.log(response.items.length);
                    for(let i = 0; i < response.items.length; i++) {
                        if(response.items[i].id.kind === "youtube#video") {
                            youtubeSearchHTML(response.items[i]);
                            break;
                        }
                    }
                });
            }
        }  else {
            let queryURL = "https://www.googleapis.com/youtube/v3/search";
            queryURL += '?' + $.param({
                part: 'snippet',
                key: 'AIzaSyBqjeZvRL_Xlr2_Fclhpr57eu3svLsSfHs',
                q: searchTerm
            });
    
            $.ajax({
                url: queryURL,
                method: 'GET'
            }).done(function(response){
    
                let videos = [];
    
                var index = 5;
                if(response.items.length < index) {
                    index = response.items.length;
                }
    
                for(let i = 0; i < index; i++) {
    
                    if(response.items[i].id.kind === "youtube#video") {
                        videos.push(response.items[i]);
                    }
                }
    
                for(let i = 0; i < videos.length; i++) {
                    youtubeSearchHTML(videos[i]);
                }
    
            });                
        }
    }

    
    function youtubeSearchHTML(video) {
        // console.log(video);
        var videoID = video.id.videoId;
        var title = video.snippet.title;
        var description = video.snippet.description;
        var thumbnailURL = video.snippet.thumbnails.high.url;
        var channel = video.snippet.channelTitle;
        // var videoLink = 'https://www.youtube.com/watch?v=' + video.id.videoId;
        var videoLink = 'https://www.youtube.com/embed/' + video.id.videoId;
 
        var youtubeCard = $('<div class="embed-responsive embed-responsive-16by9 mb-4"><iframe class="embed-responsive-item" src="' + videoLink + '"></iframe></div>');      
        $('.youtube_cards').append(youtubeCard);
    
    }

    // youtubeSearch("assassin's creed");

    $( "#search-form" ).submit(function( event ) {
        event.preventDefault();
        var searchTerm = $('#search-query').val().trim();
        foxNewsSearch(searchTerm);
        youtubeSearch(searchTerm);
    });

    foxNewsSearch('');
    youtubeSearch('');

    $(document).on('click', 'tr', function(){
        // alert($(this).attr('id'));
        window.open($(this).attr('id'));
    });
})
