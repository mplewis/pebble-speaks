var SECS_BEFORE_SPEECH = 5;
var SPEECHES_URL = 'https://gist.github.com/mplewis/9016615/raw/bd28f20110f0efb6a0142250cfe6bc082815039f/sample_speeches.json';

// Namespaces
var app = {};
var data = {};
data.homeOptions = [];
data.allModes = [
  {title: 'Speech', subtitle: 'Give a speech with prepared timings.'},
  {title: 'Practice', subtitle: 'Practice a speech and mark new timings.'},
];
data.allSpeeches = [];

app.currIndex = 0;
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

app.times_list = [];
app.start_time = 0;
app.topic_num = 0;
app.currentTopic = '';

app.markTime = function() {
  var time_diff = Date.now() - app.start_time;
  simply.body('The time difference is: ' + time_diff);
  app.times_list.push({seconds: time_diff, topic: app.currentTopic});
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
  },
  speechRun: function(event) {
  speech = app.currentSpeech;
  app.start_time = Date.now();
    if (app.currentMode === 'Practice') {
      if (app.topic_num < speech.sections.length - 1) {
        app.topic_num += 1;
        app.currentTopic = speech.sections[app.topic_num].topic;
        simply.subtitle(app.currentTopic);
        app.markTime();
      } else {
        simply.title('DONE!');
        app.topic_num = 0;
        app.currentScreen = 'home';
        return;
      }
    } else if (app.currentMode === 'Do Speech') {
      // run timer, when it hits the values in times_list have pebble vibrate
      simply.title('FUCK');
      speech = app.currentSpeech;
    }
  }
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

/*
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
*/

app.runSpeech = function() {
  app.currentScreen = 'speechRun';
};

ajax({ url: SPEECHES_URL, type: 'json' }, function(retrieved) {
  data.allSpeeches = retrieved;
  app.displayHomeOption();
});
