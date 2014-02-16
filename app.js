/* Async.js */
!function(){function d(a){var c=!1;return function(){if(c)throw new Error("Callback was already called.");c=!0,a.apply(b,arguments)}}var b,c,a={};b=this,null!=b&&(c=b.async),a.noConflict=function(){return b.async=c,a};var e=function(a,b){if(a.forEach)return a.forEach(b);for(var c=0;c<a.length;c+=1)b(a[c],c,a)},f=function(a,b){if(a.map)return a.map(b);var c=[];return e(a,function(a,d,e){c.push(b(a,d,e))}),c},g=function(a,b,c){return a.reduce?a.reduce(b,c):(e(a,function(a,d,e){c=b(c,a,d,e)}),c)},h=function(a){if(Object.keys)return Object.keys(a);var b=[];for(var c in a)a.hasOwnProperty(c)&&b.push(c);return b};"undefined"!=typeof process&&process.nextTick?(a.nextTick=process.nextTick,a.setImmediate="undefined"!=typeof setImmediate?function(a){setImmediate(a)}:a.nextTick):"function"==typeof setImmediate?(a.nextTick=function(a){setImmediate(a)},a.setImmediate=a.nextTick):(a.nextTick=function(a){setTimeout(a,0)},a.setImmediate=a.nextTick),a.each=function(a,b,c){if(c=c||function(){},!a.length)return c();var f=0;e(a,function(e){b(e,d(function(b){b?(c(b),c=function(){}):(f+=1,f>=a.length&&c(null))}))})},a.forEach=a.each,a.eachSeries=function(a,b,c){if(c=c||function(){},!a.length)return c();var d=0,e=function(){b(a[d],function(b){b?(c(b),c=function(){}):(d+=1,d>=a.length?c(null):e())})};e()},a.forEachSeries=a.eachSeries,a.eachLimit=function(a,b,c,d){var e=i(b);e.apply(null,[a,c,d])},a.forEachLimit=a.eachLimit;var i=function(a){return function(b,c,d){if(d=d||function(){},!b.length||0>=a)return d();var e=0,f=0,g=0;!function h(){if(e>=b.length)return d();for(;a>g&&f<b.length;)f+=1,g+=1,c(b[f-1],function(a){a?(d(a),d=function(){}):(e+=1,g-=1,e>=b.length?d():h())})}()}},j=function(b){return function(){var c=Array.prototype.slice.call(arguments);return b.apply(null,[a.each].concat(c))}},k=function(a,b){return function(){var c=Array.prototype.slice.call(arguments);return b.apply(null,[i(a)].concat(c))}},l=function(b){return function(){var c=Array.prototype.slice.call(arguments);return b.apply(null,[a.eachSeries].concat(c))}},m=function(a,b,c,d){var e=[];b=f(b,function(a,b){return{index:b,value:a}}),a(b,function(a,b){c(a.value,function(c,d){e[a.index]=d,b(c)})},function(a){d(a,e)})};a.map=j(m),a.mapSeries=l(m),a.mapLimit=function(a,b,c,d){return n(b)(a,c,d)};var n=function(a){return k(a,m)};a.reduce=function(b,c,d,e){a.eachSeries(b,function(a,b){d(c,a,function(a,d){c=d,b(a)})},function(a){e(a,c)})},a.inject=a.reduce,a.foldl=a.reduce,a.reduceRight=function(b,c,d,e){var g=f(b,function(a){return a}).reverse();a.reduce(g,c,d,e)},a.foldr=a.reduceRight;var o=function(a,b,c,d){var e=[];b=f(b,function(a,b){return{index:b,value:a}}),a(b,function(a,b){c(a.value,function(c){c&&e.push(a),b()})},function(){d(f(e.sort(function(a,b){return a.index-b.index}),function(a){return a.value}))})};a.filter=j(o),a.filterSeries=l(o),a.select=a.filter,a.selectSeries=a.filterSeries;var p=function(a,b,c,d){var e=[];b=f(b,function(a,b){return{index:b,value:a}}),a(b,function(a,b){c(a.value,function(c){c||e.push(a),b()})},function(){d(f(e.sort(function(a,b){return a.index-b.index}),function(a){return a.value}))})};a.reject=j(p),a.rejectSeries=l(p);var q=function(a,b,c,d){a(b,function(a,b){c(a,function(c){c?(d(a),d=function(){}):b()})},function(){d()})};a.detect=j(q),a.detectSeries=l(q),a.some=function(b,c,d){a.each(b,function(a,b){c(a,function(a){a&&(d(!0),d=function(){}),b()})},function(){d(!1)})},a.any=a.some,a.every=function(b,c,d){a.each(b,function(a,b){c(a,function(a){a||(d(!1),d=function(){}),b()})},function(){d(!0)})},a.all=a.every,a.sortBy=function(b,c,d){a.map(b,function(a,b){c(a,function(c,d){c?b(c):b(null,{value:a,criteria:d})})},function(a,b){if(a)return d(a);var c=function(a,b){var c=a.criteria,d=b.criteria;return d>c?-1:c>d?1:0};d(null,f(b.sort(c),function(a){return a.value}))})},a.auto=function(b,c){c=c||function(){};var d=h(b);if(!d.length)return c(null);var f={},i=[],j=function(a){i.unshift(a)},k=function(a){for(var b=0;b<i.length;b+=1)if(i[b]===a)return i.splice(b,1),void 0},l=function(){e(i.slice(0),function(a){a()})};j(function(){h(f).length===d.length&&(c(null,f),c=function(){})}),e(d,function(d){var i=b[d]instanceof Function?[b[d]]:b[d],m=function(b){var g=Array.prototype.slice.call(arguments,1);if(g.length<=1&&(g=g[0]),b){var i={};e(h(f),function(a){i[a]=f[a]}),i[d]=g,c(b,i),c=function(){}}else f[d]=g,a.setImmediate(l)},n=i.slice(0,Math.abs(i.length-1))||[],o=function(){return g(n,function(a,b){return a&&f.hasOwnProperty(b)},!0)&&!f.hasOwnProperty(d)};if(o())i[i.length-1](m,f);else{var p=function(){o()&&(k(p),i[i.length-1](m,f))};j(p)}})},a.waterfall=function(b,c){if(c=c||function(){},b.constructor!==Array){var d=new Error("First argument to waterfall must be an array of functions");return c(d)}if(!b.length)return c();var e=function(b){return function(d){if(d)c.apply(null,arguments),c=function(){};else{var f=Array.prototype.slice.call(arguments,1),g=b.next();g?f.push(e(g)):f.push(c),a.setImmediate(function(){b.apply(null,f)})}}};e(a.iterator(b))()};var r=function(a,b,c){if(c=c||function(){},b.constructor===Array)a.map(b,function(a,b){a&&a(function(a){var c=Array.prototype.slice.call(arguments,1);c.length<=1&&(c=c[0]),b.call(null,a,c)})},c);else{var d={};a.each(h(b),function(a,c){b[a](function(b){var e=Array.prototype.slice.call(arguments,1);e.length<=1&&(e=e[0]),d[a]=e,c(b)})},function(a){c(a,d)})}};a.parallel=function(b,c){r({map:a.map,each:a.each},b,c)},a.parallelLimit=function(a,b,c){r({map:n(b),each:i(b)},a,c)},a.series=function(b,c){if(c=c||function(){},b.constructor===Array)a.mapSeries(b,function(a,b){a&&a(function(a){var c=Array.prototype.slice.call(arguments,1);c.length<=1&&(c=c[0]),b.call(null,a,c)})},c);else{var d={};a.eachSeries(h(b),function(a,c){b[a](function(b){var e=Array.prototype.slice.call(arguments,1);e.length<=1&&(e=e[0]),d[a]=e,c(b)})},function(a){c(a,d)})}},a.iterator=function(a){var b=function(c){var d=function(){return a.length&&a[c].apply(null,arguments),d.next()};return d.next=function(){return c<a.length-1?b(c+1):null},d};return b(0)},a.apply=function(a){var b=Array.prototype.slice.call(arguments,1);return function(){return a.apply(null,b.concat(Array.prototype.slice.call(arguments)))}};var s=function(a,b,c,d){var e=[];a(b,function(a,b){c(a,function(a,c){e=e.concat(c||[]),b(a)})},function(a){d(a,e)})};a.concat=j(s),a.concatSeries=l(s),a.whilst=function(b,c,d){b()?c(function(e){return e?d(e):(a.whilst(b,c,d),void 0)}):d()},a.doWhilst=function(b,c,d){b(function(e){return e?d(e):(c()?a.doWhilst(b,c,d):d(),void 0)})},a.until=function(b,c,d){b()?d():c(function(e){return e?d(e):(a.until(b,c,d),void 0)})},a.doUntil=function(b,c,d){b(function(e){return e?d(e):(c()?d():a.doUntil(b,c,d),void 0)})},a.queue=function(b,c){function f(b,d,f,g){d.constructor!==Array&&(d=[d]),e(d,function(d){var e={data:d,callback:"function"==typeof g?g:null};f?b.tasks.unshift(e):b.tasks.push(e),b.saturated&&b.tasks.length===c&&b.saturated(),a.setImmediate(b.process)})}void 0===c&&(c=1);var g=0,h={tasks:[],concurrency:c,saturated:null,empty:null,drain:null,push:function(a,b){f(h,a,!1,b)},unshift:function(a,b){f(h,a,!0,b)},process:function(){if(g<h.concurrency&&h.tasks.length){var a=h.tasks.shift();h.empty&&0===h.tasks.length&&h.empty(),g+=1;var c=function(){g-=1,a.callback&&a.callback.apply(a,arguments),h.drain&&0===h.tasks.length+g&&h.drain(),h.process()},e=d(c);b(a.data,e)}},length:function(){return h.tasks.length},running:function(){return g}};return h},a.cargo=function(b,c){var d=!1,g=[],h={tasks:g,payload:c,saturated:null,empty:null,drain:null,push:function(b,d){b.constructor!==Array&&(b=[b]),e(b,function(a){g.push({data:a,callback:"function"==typeof d?d:null}),h.saturated&&g.length===c&&h.saturated()}),a.setImmediate(h.process)},process:function i(){if(!d){if(0===g.length)return h.drain&&h.drain(),void 0;var a="number"==typeof c?g.splice(0,c):g.splice(0),j=f(a,function(a){return a.data});h.empty&&h.empty(),d=!0,b(j,function(){d=!1;var b=arguments;e(a,function(a){a.callback&&a.callback.apply(null,b)}),i()})}},length:function(){return g.length},running:function(){return d}};return h};var t=function(a){return function(b){var c=Array.prototype.slice.call(arguments,1);b.apply(null,c.concat([function(b){var c=Array.prototype.slice.call(arguments,1);"undefined"!=typeof console&&(b?console.error&&console.error(b):console[a]&&e(c,function(b){console[a](b)}))}]))}};a.log=t("log"),a.dir=t("dir"),a.memoize=function(a,b){var c={},d={};b=b||function(a){return a};var e=function(){var e=Array.prototype.slice.call(arguments),f=e.pop(),g=b.apply(null,e);g in c?f.apply(null,c[g]):g in d?d[g].push(f):(d[g]=[f],a.apply(null,e.concat([function(){c[g]=arguments;var a=d[g];delete d[g];for(var b=0,e=a.length;e>b;b++)a[b].apply(null,arguments)}])))};return e.memo=c,e.unmemoized=a,e},a.unmemoize=function(a){return function(){return(a.unmemoized||a).apply(null,arguments)}},a.times=function(b,c,d){for(var e=[],f=0;b>f;f++)e.push(f);return a.map(e,c,d)},a.timesSeries=function(b,c,d){for(var e=[],f=0;b>f;f++)e.push(f);return a.mapSeries(e,c,d)},a.compose=function(){var b=Array.prototype.reverse.call(arguments);return function(){var c=this,d=Array.prototype.slice.call(arguments),e=d.pop();a.reduce(b,d,function(a,b,d){b.apply(c,a.concat([function(){var a=arguments[0],b=Array.prototype.slice.call(arguments,1);d(a,b)}]))},function(a,b){e.apply(c,[a].concat(b))})}};var u=function(a,b){var c=function(){var c=this,d=Array.prototype.slice.call(arguments),e=d.pop();return a(b,function(a,b){a.apply(c,d.concat([b]))},e)};if(arguments.length>2){var d=Array.prototype.slice.call(arguments,2);return c.apply(this,d)}return c};a.applyEach=j(u),a.applyEachSeries=l(u),a.forever=function(a,b){function c(d){if(d){if(b)return b(d);throw d}a(c)}c()},"undefined"!=typeof define&&define.amd?define([],function(){return a}):"undefined"!=typeof module&&module.exports?module.exports=a:b.async=a}();

var SECS_BEFORE_SPEECH = 5;
var SPEECHES_URL = 'http://pspk.kesdev.com/speeches';

// Namespaces
var app = {};
var data = {};
data.homeOptions = [];
data.allModes = [
  {title: 'Speech', subtitle: 'Give a speech with prepared timings.'},
  {title: 'Freeform', subtitle: 'Give a speech without timings.'},
  {title: 'Practice', subtitle: 'Practice a speech and mark new timings.'}
];
data.allSpeeches = [];

app.currIndex = 0;
app.currentScreen = 'loading';
app.currSpeech = '';

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
  simply.title(speechData.title);
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
app.prevTopic = '';
app.time_diff = 0;
app.interval_diff = 0;

app.markTime = function() {
  var now = Date.now();
  app.interval_diff = now - app.time_diff;
  app.time_diff = (now - app.start_time)/1000.0;
  var pretty_time = app.secsToMMSS(Math.round(app.time_diff));
  simply.body('Time so far: ' + pretty_time);
  app.times_list.push({seconds: app.interval_diff, topic: app.prevTopic});
};

app.finishPractice = function() {
  simply.title('DONE!');
  app.currentScreen = '';
  var now = Date.now();
  app.interval_diff = now - app.time_diff;
  app.time_diff = (now - app.start_time)/1000.0;
  var pretty_time = app.secsToMMSS(Math.round(app.time_diff));
  simply.subtitle('Total time: ' + pretty_time);
  app.prevTopic = speech.sections[app.topic_num-1].topic;
  app.times_list.push({seconds: app.interval_diff, topic: app.prevTopic});
  // Clean up app time diffs
  var last_millis = app.start_time;
  app.times_list = app.times_list.map(function(item) {
    // Convert to seconds and round
    var old_millis = item.seconds;
    item.seconds = Math.round((item.seconds - last_millis) / 1000);
    last_millis = old_millis;
    return item;
  });
  // Add title
  var finalSpeech = {
    title: app.currentSpeech.title,
    sections: app.times_list
  };
  simply.body('Saving timings...');
  ajax({
    method: 'put',
    url: SPEECHES_URL + '/' + app.currIndex,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    data: {'speechData': JSON.stringify(finalSpeech)}
  }, function() {
    simply.title('Data saved! Press Back to exit.');
    simply.vibe('long');
  }, function() {
    simply.title('Couldn\'t save data. RIP, Penn Wi-Fi.');
    simply.vibe('double');
  });
}

app.startNewCountdown = function(text, secs, vibe, callback) {
  var countdown = secs;
  var timer = setInterval(function() {
    countdown--;
    simply.title(app.secsToMMSS(countdown));
    if (countdown <= 0) {
      clearInterval(timer);
      simply.vibe(vibe);
      callback();
    }
  }, 1000);
  simply.title(app.secsToMMSS(countdown));
  simply.subtitle(text);
};

app.startAllCountdowns = function(speech) {
  async.eachSeries(speech.sections, function(s, done) {
    app.startNewCountdown(s.topic, s.seconds, 'short', done);
  }, app.speechDone);
};

app.speechDone = function() {
    app.currentScreen = '';
    simply.vibe('double');
    simply.title('You\'re done!');
    simply.subtitle('Matt, He, Jiexi, and Kyle for PennApps 2014');
};

app.buttonHandlers = {
  loading: function(event) {},
  modeSelect: function(event) {
    if (event.button === 'up') {
      if (app.currIndex > 0) {
        app.currIndex--;
        simply.setText({title: data.allModes[app.currIndex].title}, true);
        simply.subtitle(data.allModes[app.currIndex].subtitle);
      }
    } else if (event.button === 'down') {
      if (app.currIndex + 1 < data.allModes.length) {
        app.currIndex++;
        simply.setText({title: data.allModes[app.currIndex].title}, true);
        simply.subtitle(data.allModes[app.currIndex].subtitle);
      }
    } else if (event.button === 'select') {
      app.currentMode = data.allModes[app.currIndex].title;
      app.speechSelect();
    }
  },
  speechSelect: function(event) {
    if (event.button === 'up') {
        app.currIndex--;
      if (app.currIndex < 0) {
        app.currIndex = 0;
      }
      app.displaySpeech(data.allSpeeches[app.currIndex]);
      simply.body('Speech ' + (app.currIndex + 1) +
                  ' of ' + data.allSpeeches.length);
    } else if (event.button === 'down') {
      app.currIndex++;
      if (app.currIndex >= data.allSpeeches.length) {
        app.currIndex = data.allSpeeches.length - 1;
      }
      app.displaySpeech(data.allSpeeches[app.currIndex]);
      simply.body('Speech ' + (app.currIndex + 1) +
                  ' of ' + data.allSpeeches.length);
    } else if (event.button === 'select') {
      simply.body('');
      var speech = data.allSpeeches[app.currIndex];
      app.currentSpeech = speech;
      if (app.currentMode === 'Speech') {
        app.runSpeech(speech);
      } else if (app.currentMode === 'Practice') {
        app.runPractice(speech);
      } else {
        app.runFreeform(speech);
      }
    }
  },
  runPractice: function(event) {
    speech = app.currentSpeech;
    if (app.topic_num < speech.sections.length) {
      app.currentTopic = speech.sections[app.topic_num].topic;
      app.prevTopic = speech.sections[app.topic_num-1].topic;
      simply.subtitle(app.currentTopic);
      app.markTime();
      app.topic_num += 1;
    } else {
      app.finishPractice();
    }
  },
  runFreeform: function(event) {
    // Button handler code goes here
    if (app.topic_num < speech.sections.length) {
      app.currentTopic = speech.sections[app.topic_num].topic;
    } else {
      simply.title('Done!');
      simply.subtitle('Go back for another speech!');
      simply.body('');
    }
  }
};

app.accelHandlers = {
  runPractice: function(event) {
    speech = app.currentSpeech;
    if (app.topic_num < speech.sections.length) {
      app.currentTopic = speech.sections[app.topic_num].topic;
      app.prevTopic = speech.sections[app.topic_num-1].topic;
      simply.subtitle(app.currentTopic);
      app.markTime();
      app.topic_num += 1;
    } else {
      app.finishPractice();
    }
  },
  runFreeform: function(event) {
    if (app.topic_num < speech.sections.length) {
      app.currentTopic = speech.sections[app.topic_num].topic;
    } else {
      app.speechDone();
    }
  }
};

simply.on('singleClick', function(event) {
  if (app.currentScreen in app.buttonHandlers) {
    app.buttonHandlers[app.currentScreen](event);
  }
});

simply.on('accelTap', function(event) {
  if (app.currentScreen in app.accelHandlers) {
    app.accelHandlers[app.currentScreen](event);
  }
});

app.speechSelect = function() {
  app.currentScreen = 'speechSelect';
  app.currIndex = 0;
  app.displaySpeech(data.allSpeeches[app.currIndex]);
  simply.body('Speech ' + (app.currIndex + 1) +
              ' of ' + data.allSpeeches.length);
};

app.runPractice = function(speech) {
  app.currentScreen = 'runPractice';
  app.start_time = Date.now();
  var currTopic = speech.sections[app.topic_num].topic;
  simply.title('RECORDING Press to mark:');
  simply.subtitle(currTopic);
  app.topic_num += 1;
};

app.runSpeech = function(speech) {
  app.currentScreen = 'runSpeech';
  app.currentSpeech = speech;

  var countdown = SECS_BEFORE_SPEECH;
  var ctdToSpeechStart = setInterval(function() {
    countdown--;
    if (countdown <= 0) {
      clearInterval(ctdToSpeechStart);
      simply.vibe('double');
      app.startAllCountdowns(speech);
      return;
    }
    simply.subtitle('Starts in ' + countdown + '...');
  }, 1000);
  simply.subtitle('Starts in ' + countdown + '...');
};

app.runFreeform = function() {
  app.currentScreen = 'runFreeform';
  var currTopic = speech.sections[app.topic_num].topic;
  simply.subtitle(currTopic);
  app.topic_num += 1;
}

simply.title('Loading...');

ajax({ url: SPEECHES_URL, type: 'json' }, function(retrieved) {
  data.allSpeeches = retrieved;
  app.displayHomeOption();
});

