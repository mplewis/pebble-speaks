var speechData = {
  title: 'Pet animals',
  sections: [
    {seconds: 60, topic: 'Kittens'},
    {seconds: 20, topic: 'Puppies'},
    {seconds: 30, topic: 'Birdies'},
  ]
};

var currSectionNum = 0;
var numSections = speechData.sections.length;

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

function displaySection(sectionNum) {
  var section = speechData.sections[sectionNum];
  var mmss = secsToMMSS(section.seconds);
  simply.setText({title: mmss}, true);
  simply.subtitle(section.topic);
}

simply.on('singleClick', function(event) {
  if (event.button === 'up') {
    if (currSectionNum > 0) {
      currSectionNum--;
      displaySection(currSectionNum);
    }
  } else if (event.button === 'down') {
    if (currSectionNum < numSections - 1) {
      currSectionNum++;
      displaySection(currSectionNum);
    }
  }
});

displaySection(currSectionNum);
