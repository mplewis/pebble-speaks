$(function() {
    $("#submit").on("click", function() {
        var speechName = $("#speechName").val();
        var topicPhrases = document.getElementById("topicPhrases").value;
        console.log(speechName);
        console.log(topicPhrases);
    });
});
