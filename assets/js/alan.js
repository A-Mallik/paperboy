

$(".navbar-brand").on("click", function() {
    location.reload()
})


$(".reddit-title").on("click", function() {
    $(".reddit-minimize-icon").toggleClass("active-card")
    $(".reddit-card").toggleClass("lower-card-expand")
    $(".reddit-card").toggleClass("bring-to-front")
    $(".reddit-minimize-icon").toggleClass("fa-plus")
    $(".reddit-minimize-icon").toggleClass("fa-chevron-down")
    $(".wrapper").toggleClass("wrapper-fade")
    $(".fade-container").toggleClass("fade-cards")
})

$(".youtube-title").on("click", function() {
    $(".youtube-minimize-icon").toggleClass("active-card")
    $(".youtube-card").toggleClass("lower-card-expand")
    $(".youtube-card").toggleClass("bring-to-front")
    $(".youtube-minimize-icon").toggleClass("fa-plus")
    $(".youtube-minimize-icon").toggleClass("fa-chevron-down")
    $(".wrapper").toggleClass("wrapper-fade")
    $(".fade-container").toggleClass("fade-cards")
})

$(".wiki-title").on("click", function() {
    $(".wiki-minimize-icon").toggleClass("active-card")
    $(".wiki-card").toggleClass("lower-card-expand")
    $(".wiki-card").toggleClass("bring-to-front")
    $(".wiki-minimize-icon").toggleClass("fa-plus")
    $(".wiki-minimize-icon").toggleClass("fa-chevron-down")
    $(".wrapper").toggleClass("wrapper-fade")
    $(".fade-container").toggleClass("fade-cards")
})

$(".fade-container").on("click", function() {
    $(".reddit-card").removeClass("lower-card-expand")
    $(".reddit-card").removeClass("bring-to-front")
    $(".youtube-card").removeClass("lower-card-expand")
    $(".youtube-card").removeClass("bring-to-front")
    $(".wiki-card").removeClass("lower-card-expand")
    $(".wiki-card").removeClass("bring-to-front")
    $(".fade-container").toggleClass("fade-cards")
    $(".active-card").removeClass("fa-chevron-down")
    $(".active-card").addClass("fa-plus")
    $(".active-card").removeClass("active-card")


})

$("#search-query").on("click", function() {
    console.log(phrases.length)
    if(phrases.length < 1) {
    headlines = headlines.toString()
    headlines = headlines.split(',').filter(function(item,i,allItems){
        return i==allItems.indexOf(item);
    }).join(',');
    getphrase(headlines)
}
  });

var phrases = []
var headlines = []




var getheadlines = function() {
    let headlinequeryURL = "https://newsapi.org/v2/top-headlines";
        headlinequeryURL += '?' + $.param({
        country: 'us',
        apiKey: '05a55fd89c6b4d94ae64d1b170833e33',
    });
    $.ajax({
        url: headlinequeryURL,
        method: 'GET'
    }).done(function(response){
        for(var i = 0; i < 20; i++) {
            headlines.push(response.articles[i].title + " ")
        }
    });

}

var getphrase = function(h) {
    let phrasequeryURL = "https://apis.paralleldots.com/v3/phrase_extractor";
            phrasequeryURL += '?' + $.param({
                api_key: '4IWeUd8aq3Laa723cmhbGpz9XB8kpYID3EhpxlFhyf8',
                text: h
            });

    $.ajax({
        url: phrasequeryURL,
        method: 'POST'
    }).done(function(response){
        for(var i = 0; i < Object.keys(response.keywords).length; i++) {
        phrases.push(response.keywords[i].keyword)
        }
        var demo1 = new autoComplete({
            selector: '#search-query',
            minChars: 1,
            source: function(term, suggest){
                term = term.toLowerCase();
                var choices = phrases
                var suggestions = [];
                for (i=0;i<choices.length;i++)
                    if (~choices[i].toLowerCase().indexOf(term)) suggestions.push(choices[i]);
                suggest(suggestions);
            },
            onSelect: function(e, term, item){
                console.log("test")
                console.log(e)
                console.log(e.type)
                $("#search-query").submit()
                // var form = document.getElementById("search-query")
                // form.submit()
            }
        });
        // var form = document.getElementById("search-query");
        //     document.getElementById("your-id").addEventListener("click", function () {
        //     form.submit();
        //     });
        console.log(phrases)



    });
}





getheadlines()