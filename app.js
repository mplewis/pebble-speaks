var SECS_BEFORE_SPEECH = 5;

// Namespaces
var app = {};
var data = {};
data.homeOptions = [];
data.allModes = [
  {title: 'Speech', subtitle: 'Give a speech with prepared timings.'},
  {title: 'Practice', subtitle: 'Practice a speech and mark new timings.'},
];

data.allSpeeches = [
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

app.currentScreen = 'loading';
app.currentMode = 'practice';
app.currentSpeech = '';

simply.setText({title: 'Loading...'}, true);

app.secsToMMSS = function(secs) {
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
};

app.displaySpeech = function(speechData) {
  simply.setText({title: speechData.title}, true);
  simply.subtitle(speechData.sections.length + ' sections');
};

app.displayHomeOption = function() {
  var currIndex = 0;
  simply.setText({title: data.allModes[currIndex].title}, true);
  simply.subtitle(data.allModes[currIndex].subtitle);

  simply.on('singleClick', function(event) {
    if (event.button === 'up') {
      if (currIndex > 0) {
        currIndex--;
        simply.setText({title: data.allModes[currIndex].title}, true);
        simply.subtitle(data.allModes[currIndex].subtitle);
      }
    } else if (event.button === 'down') {
      if (currIndex + 1 < data.allModes.length) {
        currIndex++;
        simply.setText({title: data.allModes[currIndex].title}, true);
        simply.subtitle(data.allModes[currIndex].subtitle);
      }
    } else if (event.button === 'select') {
      app.currentScreen = 'speechSelect';
      app.currentMode = data.allModes[currIndex].title;
      app.selectSpeech();
    }
  });
};

app.selectSpeech = function() {
  var displaySpeech = function(speechData) {
    simply.setText({title: speechData.title}, true);
    simply.subtitle(speechData.sections.length + ' sections');
  };

  var currIndex = 0;
  displaySpeech(data.allSpeeches[currIndex]);

  simply.on('singleClick', function(event) {
    if (event.button === 'up') {
      if (currIndex > 0) {
        currIndex--;
        displaySpeech(data.allSpeeches[currIndex]);
      }
    } else if (event.button === 'down') {
      if (currIndex + 1 < data.allSpeeches.length) {
        currIndex++;
        displaySpeech(data.allSpeeches[currIndex]);
      }
    } else if (event.button === 'select') {
      app.currentSpeech = data.allSpeeches[currIndex];
      app.currentScreen = 'speechRun';
      app.runSpeech();
    }
  });
};

app.runSpeech = function() {
  var countdown = SECS_BEFORE_SPEECH;
  var ctdToSpeechStart = setInterval(function() {
    countdown--;
    if (countdown <= 0) {
      clearInterval(ctdToSpeechStart);
      simply.vibe('double');
      simply.title('GO!');
      simply.subtitle('');
      return;
    }
    simply.subtitle('Starts in ' + countdown + '...');
  }, 1000);
  simply.subtitle('Starts in ' + countdown + '...');

  currentMode = 'home';
  return;
};

app.displayHomeOption();
