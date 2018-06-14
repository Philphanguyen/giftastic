$(document).ready(function() {
    var topics=["charmander","bulbasaur","squirtle","pikachu","eevee",
                "psyduck", "snorlax", "magikarp", "zubat", "meowth"]
    var btns = $("#topicsArea");

    function buttonMaker() {
        for (var i = 0; i < topics.length; i++) {
            var buttons = $("<button>");
            buttons.text(topics[i]);
            buttons.attr("btnTopic", topics[i])
            buttons.attr("id", "topic")
            btns.append(buttons);
            console.log(topics[i]);
        }
    }

    buttonMaker();

    $(document).on("click", "#topic", function() {

        buttonTopic = $(this).attr("btnTopic");
        buttonTopic = buttonTopic.replace(" ", "+");

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            buttonTopic + "&api_key=jVID0I10T5ftdkKd7x2BwpinW7BQhQuI&limit=10";
        
        $.ajax({
            url: queryURL,
            method: "get"
        })
            .then(function(response) {
                var results = response.data;
                for (var i = 0; i < results.length; i++) {
                    var gifDiv = $("<div>");
                    var p = $("<p>").text("Rating: " + results[i].rating);
                    var topicImage = $("<img>");
                    topicImage.attr("src", results[i].images.fixed_height_still.url);
                    topicImage.attr("data-still", results[i].images.fixed_height_still.url);
                    topicImage.attr("data-animate", results[i].images.fixed_height.url);
                    topicImage.attr("data-state", "still");
                    topicImage.attr("class", "gif");
                    gifDiv.append(p);
                    gifDiv.append(topicImage);
                    $("#gifArea").prepend(gifDiv);
                }
            });
        
    })
    $(document).on("click", "#searcher", function() {
        var searchTerm = $("input").val();
        topics.push(searchTerm);
        console.log(topics);
        $("#topicsArea").empty();
        buttonMaker();
    });
    $(document).on("click", ".gif", function() {
        console.log("pressed");
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

})