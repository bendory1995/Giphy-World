var topics = ["augmented reality", "computer", "programming", "iphone", "macbook", "apple watch", "programmer", "virtual reality", "facebook", "amazon", "netflix", "google", "kindle"];

function renderButtons(){
    for (var i = 0; i < topics.length; i++) {
        var topicBtn = $("<button>");
        topicBtn.addClass("topic");
        topicBtn.attr("data-topic", topics[i]);
        topicBtn.text(topics[i]);
        $("#buttons").append(topicBtn);    
    }
}


function displayGif(){
    $("#gifs").empty();
    var gif = $(this).attr("data-topic");
    console.log(gif);
    var queryURL = "http://api.giphy.com/v1/gifs/search?q="+ gif +"&api_key=gnnlfsOnrD9U9TqUGuqNcMPbG4DEFJ4z&limit=10 ";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        var gifDiv = $("<div class= 'gif'>");

        console.log(response);
        
        var giffs = response.data;
        for (i in giffs){
            //ratingDiv.append("<p" + giffs[i].rating + "</p>");
            gifDiv.append("<img src ='"+ giffs[i].images.original.url+"' >");
        }
        $("#gifs").append(gifDiv);
    });
}

$(document).on("click", ".topic", displayGif);
renderButtons();


