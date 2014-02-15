var SECS_BEFORE_SPEECH = 5;

// Namespaces
var app = {};
var data = {};
data.homeOptions = [];
data.allModes = [
  {title: 'Speech', subtitle: 'Give a speech with prepared timings.'},
  {title: 'Practice', subtitle: 'Practice a speech and mark new timings.'},
];

app.currIndex = 0;

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
  app.currentScreen = 'modeSelect';
  simply.setText({title: data.allModes[app.currIndex].title}, true);
  simply.subtitle(data.allModes[app.currIndex].subtitle);
};

app.buttonHandlers = {
  loading: function(event) {},
  modeSelect: function(event) {
    if (event.button === 'up') {
      if (app.currIndex > 0) {
        app.currIndex--;
        simply.setText({title: data.allModes[app.currIndex].title}, true);
        simply.subtitle(data.allModes[currIndex].subtitle);
      }
    } else if (event.button === 'down') {
      if (app.currIndex + 1 < data.allModes.length) {
        app.currIndex++;
        simply.setText({title: data.allModes[app.currIndex].title}, true);
        simply.subtitle(data.allModes[app.currIndex].subtitle);
      }
    } else if (event.button === 'select') {
      app.currentMode = data.allModes[app.currIndex].title;
      app.selectSpeech();
    }
  },
  speechSelect: function(event) {
    if (event.button === 'up') {
      if (app.currIndex > 0) {
        app.currIndex--;
        app.displaySpeech(data.allSpeeches[app.currIndex]);
      }
    } else if (event.button === 'down') {
      if (app.currIndex + 1 < data.allSpeeches.length) {
        app.currIndex++;
        app.displaySpeech(data.allSpeeches[app.currIndex]);
      }
    } else if (event.button === 'select') {
      app.currentSpeech = data.allSpeeches[app.currIndex];
      app.runSpeech();
    }
  }
};

app.selectSpeech = function() {
   displaySpeech = function(speechData) {
    simply.setText({title: speechData.title}, true);
    simply.subtitle(speechData.sections.length + ' sections');
  };

  displaySpeech(data.allSpeeches[app.currIndex]);
};

simply.on('singleClick', function(event) {
  if (app.currentScreen in app.buttonHandlers) {
    app.buttonHandlers[app.currentScreen](event);
  }
});

app.selectSpeech = function() {
  app.currentScreen = 'speechSelect';
  app.displaySpeech(data.allSpeeches[app.currIndex]);
};

app.runSpeech = function() {
  app.currentScreen = 'speechRun';
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
