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
            foxNewsSearchHTML(response);
        })
    }

    function foxNewsSearchHTML(response) {
        $('.fox_news_cards').empty();
        if(response.totalResults > 0) {
            for(let i = 0; i < response.articles.length; i++) {

                var title = response.articles[i].title;
                var description = response.articles[i].description;
                var url = response.articles[i].url;
                var image = response.articles[i].urlToImage;

                var foxNewsCard = $('<tr id="' + url + '"><td><h6>' + title + '</h6><p>' + description + '</p></td><td class="d-flex justify-content-end"><img src="' + image +'" class="placeholder"></td></tr>');
                $('.fox_news_cards').append(foxNewsCard);
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
        var youtubeSearchArray = ['fox news top news', 'nyt news', 'bbc top news', 'c span', 'cbs top news'];

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
