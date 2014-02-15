$(function() {
    $("#submit").on("click", function() {
        var speechName = $("#speechName").val();
        var topicPhrases = document.getElementById("topicPhrases").value;

        topicPhrases = topicPhrases.split('\n');
        // Trim trailing whitespace
        for (var i in topicPhrases) {
            topicPhrases[i] = topicPhrases[i].trim();
        }

        var speechData = {
            speechName: speechName,
            topicPhrases: topicPhrases,
        };

        var jsonSpeech = JSON.stringify(speechData);
        console.log(jsonSpeech);

        var server = "http://107.170.13.33:3000/speeches";

        $.ajax({
            type: "POST",
            url: reqbin,
            data: JSON.stringify(speechData),
            contentType: "application/json",
            dataType: "json",
            success: function(data){
                console.log(data)
            },
            failure: function(err){
                console.log(err)
            }
        });
    });
});
