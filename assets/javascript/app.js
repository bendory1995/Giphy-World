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
        console.log(response);
        var gifDiv = $("<div class= 'gif'>");
        var gifData = response.data;
        for (i in gifData){
            var gifStillUrl = response.data[i].images.original_still.url;
            var gifAnimateUrl = response.data[i].images.original.url;
            var imgURL = response.data[i].images.original_still.url;
            var image = $("<img>").attr("src", imgURL);
            var rating = response.data[i].rating;
            image.attr("data-rating", rating);
            image.attr("data-still", gifStillUrl);
            image.attr("data-animate", gifAnimateUrl);
            image.attr("data-state", "still");
            image.append(rating);
            gifDiv.append(rating, image);
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
    $("#gif-input").val("");
})
$(document).on("click","img", function(){
    console.log($(this).attr("data-state"));
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
})

$(document).on("click", ".gif-btn", displayGif);
renderButtons();