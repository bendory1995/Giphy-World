var topics = ["augmented reality", "computer", "programming", "iphone", "macbook", "apple watch", "programmer", "virtual reality", "facebook", "amazon", "netflix", "google", "kindle"];



function displayGif(){
    $("#gifs").empty();

    var gif = $(this).attr("data-topic");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q="+ gif +"&api_key=gnnlfsOnrD9U9TqUGuqNcMPbG4DEFJ4z&limit=10 ";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        var gifDiv = $("<div class= 'gif'>");
        
        var giffs = response.data;
        for (i in giffs){
            //gifDiv.append("<span>" + giffs[i].rating + "</span>");
            gifDiv.append("<img id =  '" + i + "' + src ='"+ giffs[i].images.original_still.url+"' >");
        }
        $("#gifs").append(gifDiv);
    });
}

function renderButtons(){
    $("#buttons").empty();

    for (var i = 0; i < topics.length; i++) {
        var topicBtn = $("<button>");
        topicBtn.addClass("topic");
        topicBtn.attr("data-topic", topics[i]);
        topicBtn.text(topics[i]);
        $("#buttons").append(topicBtn);    
    }
}

$("#add-gif").on("click", function(event){
    console.log("YES");
    event.preventDefault();
    var gif = $("#gif-input").val().trim();
    console.log(gif);
    topics.push(gif);
    renderButtons();
    console.log(topics);
    
})

$(document).on("click", ".topic", displayGif);
renderButtons();

