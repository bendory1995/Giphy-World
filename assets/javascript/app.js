// an array containing all the topics.
var gifs = ["augmented reality", "computer", "programming", "iphone", "macbook", "apple watch", "programmer", "virtual reality", "facebook", "amazon", "netflix", "google", "kindle"];

function displayGif(){
    $("#gifs-view").empty();
    var gif = $(this).attr("data-name");
    var queryURL ="http://api.giphy.com/v1/gifs/search?q="+ gif +"&api_key=gnnlfsOnrD9U9TqUGuqNcMPbG4DEFJ4z&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        var gifDiv = $("<div class= 'gif'>");
        var gifData = response.data;
        for (i in gifData){
            var gifStillUrl = response.data[i].images.original_still.url;
            var gifAnimateUrl = response.data[i].url;
            var imgURL = response.data[i].images.original_still.url;
            var image = $("<img>").attr("src", imgURL);
            image.attr("data-still", gifStillUrl);
            image.attr("data-animate", gifAnimateUrl);
            gifDiv.append(image);
        }
        $("#gifs-view").prepend(gifDiv);

        
    })
}

function renderButtons(){
    $("#buttons-view").empty();
    for (var i = 0; i < gifs.length; i++){
        var a = $("<button>");
        a.addClass("gif-btn");
        a.attr("data-name",gifs[i]);
        a.text(gifs[i]);
        $("#buttons-view").append(a);
    } 

}

$("#add-gif").on("click", function(event){
    event.preventDefault();
    var gif = $("#gif-input").val().trim();
    gifs.push(gif);
    renderButtons();
})

$(document).on("click", ".gif-btn", displayGif);
renderButtons();