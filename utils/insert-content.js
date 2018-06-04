const mongoose = require('mongoose');
const Content = require('../models/content');
const configDB = require('../config/database.js');
mongoose.connect(configDB.url, {
});
var db = mongoose.connection;
db.on('error', function (err) {
  console.error('There was a db connection error');
  return  console.error(err.message);
});
db.once('connected', function () {
  console.log('Successfully connected to ' + configDB.url);
  content = [
    // {'joke': 'WHICH PASTA HAS THE MOST COMEBACKS?',
    // 'punchline': 'RETORT-ELLINI',
    // 'nsfw': false},
    // {'joke': 'WHAT DO YOU CALL AN INEXPERIENCED PIG?',
    // 'punchline': 'A HAMETUER',
    // 'nsfw': false},
    // {'joke': "WHAT IS A BABY COW'S FAVORITE STIMULANT?",
    // 'punchline': 'CALF-FEINNE',
    // 'nsfw': false},
    // {'joke': "WHERE DID NAPOLEON KEEP HIS ARMIES?",
    // 'punchline': 'IN HIS SLEEVIES',
    // 'nsfw': false},
    // {'joke': "WHAT DID PEOPLE SAY ABOUT THE CAMPSITE ORGY?",
    // 'punchline': 'IN WAS IN TENTS',
    // 'nsfw': false},
  ]

  var i;
  for(i = 0; i < content.length; ++i) {
    var newContent = new Content({
      'content.joke': content[i].joke,
      'content.punchline': content[i].punchline,
      'content.nsfw': content[i].nsfw,
    });
    console.log(newContent)
    newContent.save()
  };
});
db.once('disconnected', function () {
  return console.error('Successfully disconnected from ' + configDB.url);
});
