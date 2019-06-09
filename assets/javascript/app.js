$(document).ready(function(){
    var topics = ["augmented reality", "computer", "programming", "iphone", "macbook", "apple watch", "programmer", "virtual reality", "facebook", "amazon", "netflix", "google", "kindle"];

    console.log(topics);
    for (var i = 0; i < topics.length; i++){
        var topicBtn = $("<button>");
        topicBtn.addClass("topic");
        topicBtn.attr("data-topic", topics[i]);
        topicBtn.text(topics[i]);
        $("#buttons").append(topicBtn);

        console.log(topicBtn);
    }

})