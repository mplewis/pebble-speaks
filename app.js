simply.setText({title: 'Loading...'}, true);

function secsToMMSS(secs) {
  var minutes = 0;
  while (secs >= 60) {
    secs -= 60;
    minutes += 1;
  }
  if (minutes < 10)
    minutes = '0' + minutes;
  if (secs < 10)
    secs = '0' + secs;
  return minutes + ':' + secs;
}

function displaySection(sectionData) {
  var mmss = secsToMMSS(sectionData.seconds);
  simply.setText({title: mmss}, true);
  simply.subtitle(sectionData.topic);
}

function displaySpeech(speechData) {
  simply.setText({title: speechData.title}, true);
  simply.subtitle(speechData.sections.length + ' sections');
}

function sectionData(speechData, sectionNum) {
  return speechData.sections[sectionNum];
}

function loadSpeeches(url, callback) {
  var allSpeeches = [
    {
      title: 'Pet animals',
      sections: [
        {seconds: 60, topic: 'Kittens'},
        {seconds: 20, topic: 'Puppies'},
        {seconds: 30, topic: 'Birdies'}
      ]
    },
    {
      title: 'Deadly animals',
      sections: [
        {seconds: 29, topic: 'Snakes'},
        {seconds: 255, topic: 'Sharks'}
      ]
    },
    {
      title: 'Awesome foods',
      sections: [
        {seconds: 100, topic: 'Chaat'},
        {seconds: 601, topic: 'Pizza'},
        {seconds: 331, topic: 'Salmon'},
        {seconds: 33, topic: 'Filet mignon'}
      ]
    },
  ];
  callback(allSpeeches);
}


loadSpeeches('http://www.whatever.com/', function(speeches) {
  var currSpeech = 0;
  simply.on('singleClick', function(event) {
    if (event.button === 'up') {
      if (currSpeech > 0) {
        currSpeech--;
        displaySpeech(speeches[currSpeech]);
      }
    } else if (event.button === 'down') {
      if (currSpeech + 1 < speeches.length) {
        currSpeech++;
        displaySpeech(speeches[currSpeech]);
      }
    }
  });
  displaySpeech(speeches[0]);
});