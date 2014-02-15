var SECS_BEFORE_SPEECH = 5;

var speeches;
var currSpeech = 0;
var currentMode = 'loading'; // 'speechSelect', 'speechRun'
var practice_or_do = 'practice';
var options;
var currOption = 0;

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

function loadHomeScreen(url, callback) {
  var homeOptions = [
    { title: 'Do Speech' },
    { title: 'Practice' },
  ];
  callback(homeOptions);
}

function displayHomeOption(currentOption) {
  simply.setText({title: currentOption}, true);
}

function selectSpeech(speech) {
  currentMode = 'speechRun';
  simply.title(speech.title);
  var countdown = SECS_BEFORE_SPEECH;
  var ctdToSpeechStart = setInterval(function() {
    countdown--;
    if (countdown <= 0) {
      clearInterval(ctdToSpeechStart);
      simply.title('GO!');
      simply.subtitle('');
      return;
    }
    simply.subtitle('Starts in ' + countdown + '...');
  }, 1000);
  simply.subtitle('Starts in ' + countdown + '...');
  currentMode = 'home'
  return;

}

simply.on('singleClick', function(event) {
  if (currentMode === 'home') {
    if (event.button === 'up') {
      if (currOption > 0) {
        currOption--;
        displayHomeOption(options[currOption].title);
      }
    } else if (event.button === 'down') {
      if (currOption + 1 < options.length) {
        currOption++;
        displayHomeOption(options[currOption].title);
      }
    } else if (event.button === 'select') {
        loadSpeeches('http://www.whatever.com/', function(speechesRetrieved) {
          currentMode = 'speechSelect';
          speeches = speechesRetrieved;
          displaySpeech(speeches[0]);
        })
    }
  } else if (currentMode === 'speechSelect') {
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
    } else if (event.button === 'select') {
      selectSpeech(speeches[currSpeech]);
    }

  }
});


loadHomeScreen('some bullshit url', function(optionsRetrieved) {
  currentMode = 'home';
  options = optionsRetrieved;
  displayHomeOption(options[0].title);
});

/*
loadSpeeches('http://www.whatever.com/', function(speechesRetrieved) {
  currentMode = 'speechSelect';
  speeches = speechesRetrieved;
  displaySpeech(speeches[0]);
});
*/

/*ajax({ url: 'ENTER URL HERE' }, function(speechesRetrieved){
  currentMode = 'speechSelect';
  var speeches = speechesRetrieved;
  displaySpeech(speeches[0]);
});*/
