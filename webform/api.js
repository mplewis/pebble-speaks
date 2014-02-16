$(function() {
  $("#submit").on("click", function() {
    var speechName = $("#speechName").val();
    var topicPhrases = document.getElementById("topicPhrases").value;
    var defaultSeconds = 10;

    topicPhrases = topicPhrases.split("\n");
    var sections = [];
    // Trim trailing whitespace and format correctly for storage
    for (var i in topicPhrases) {
      var topic = {
        "seconds": defaultSeconds,
        "topic": topicPhrases[i].trim()
      };
      sections.push(topic);
    }

    var speechData = {
      title: speechName,
      sections: sections
    };

    var jsonSpeech = JSON.stringify(speechData);
    console.log(jsonSpeech);

    $.ajax({
      type: "POST",
      url: "http://pspk.kesdev.com/speeches",
      data: JSON.stringify(speechData),
      contentType: "application/json",
      dataType: "json",
      success: function(data){
        console.log(data);
      },
      failure: function(err){
        console.log(err);
      }
    });
  });
});
