var SECS_BEFORE_SPEECH = 5;

// Namespaces
var app = {};
var data = {};
data.homeOptions = [];
data.allModes = [
  { title: 'Do Speech' },
  { title: 'Practice' },
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

app.currentScreen = 'loading'; // 'speechSelect', 'speechRun'
app.currentMode = 'practice'; // 'doSpeech'
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

  simply.on('singleClick', function(event) {
    if (event.button === 'up') {
      if (currIndex > 0) {
        currIndex--;
        simply.setText({title: data.allModes[currIndex].title}, true);
      }
    } else if (event.button === 'down') {
      if (currIndex + 1 < data.allModes.length) {
        currIndex++;
        simply.setText({title: data.allModes[currIndex].title}, true);
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

/*
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

  currentMode = 'home';
  return;
};
*/
var times_list = [];
var start_time = 0;
app.currentTopic = '';

app.markTime = function() {
  var time_diff = Date.now() - start_time;
  simply.body('The time difference is: ' + time_diff);
  times_list.push({seconds: time_diff, topic: app.currentTopic});
};

app.runSpeech = function() {
  currentMode = 'speechRun';
  speech = app.currentSpeech;
  start_time = Date.now();
  var topic_num = 0;
  if (app.currentMode === 'Practice') {
    simply.on('singleClick', function(e) {
      app.currentTopic = speech.sections[topic_num].topic;
      simply.subtitle(app.currentTopic);
      app.markTime();
      topic_num += 1;
    });
    simply.on('longClick', function(e) {
      simply.title('DONE!');
      return;
    });
  } else if (app.currentMode === 'Do Speech') {
      // run timer, when it hits the values in times_list have pebble vibrate
      simply.title('FUCK');
  }
};
app.displayHomeOption();
