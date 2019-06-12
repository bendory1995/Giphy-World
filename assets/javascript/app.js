// an array containing all the topics.
var gifs = ["augmented reality", "computer", "programming", "iphone", "macbook", "apple watch", "programmer", "virtual reality", "facebook", "amazon", "netflix", "google", "kindle"];

function displayGif(){
    //emptying the gifs view before displaying
    $("#gifs-view").empty();
    //grabbing the name of a gif
    var gif = $(this).attr("data-name");
    //this is the api url .
    var queryURL ="https://api.giphy.com/v1/gifs/search?q="+ gif +"&api_key=gnnlfsOnrD9U9TqUGuqNcMPbG4DEFJ4z&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
        //creating a div
        var gifDiv = $("<div class= 'gif'>");
        // storing the data to a variable 
        var gifData = response.data;
        // looping through the data so we can get the full data.
        for (i in gifData){
            //storing the still url 
            var gifStillUrl = response.data[i].images.original_still.url;
            // storing the animate url
            var gifAnimateUrl = response.data[i].images.original.url;
            // storing the image url
            var imgURL = response.data[i].images.original_still.url;
            // creating an img tag and storing it in to image
            var image = $("<img>").attr("src", imgURL);
            // grabbing the rating.
            var rating = response.data[i].rating;
            //setting each value to where it belongs
            image.attr("data-rating", rating);
            image.attr("data-still", gifStillUrl);
            image.attr("data-animate", gifAnimateUrl);
            image.attr("data-state", "still");
            //show rating
            image.append(rating);
            // show rating and image.
            gifDiv.append(rating, image);
        }

        $("#gifs-view").prepend(gifDiv);

        
    })
}
//this renders the button when page loads.
function renderButtons(){
    //clears out the button view
    $("#buttons-view").empty();
    // loop through so we can get buttons and store data.
    for (var i = 0; i < gifs.length; i++){
        //creating button dynamically
        var a = $("<button>");
        //adding class to the button
        a.addClass("gif-btn");
        //giving name attribute
        a.attr("data-name",gifs[i]);
        //write the name out
        a.text(gifs[i]);
        //show on the screen
        $("#buttons-view").append(a);
    } 

}

//on click add a gif 
$("#add-gif").on("click", function(event){
    event.preventDefault();
    // store what user entered in to a variable
    var gif = $("#gif-input").val().trim();
    // push the gif to the list
    gifs.push(gif);
    // render it so it shows
    renderButtons();
    // empty the text
    $("#gif-input").val("");
})

//when the img is clicked 
$(document).on("click","img", function(){
    console.log($(this).attr("data-state"));
    // receive the data state
    var state = $(this).attr("data-state");
    // if it's still change the state and src
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
})

//when the gif button is clicked, display gif.
$(document).on("click", ".gif-btn", displayGif);
// render the buttons.
renderButtons();