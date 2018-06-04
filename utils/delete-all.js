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
  Content.remove({})
  .then(function(err, obj) {
    if(err)
      console.log(err)
    if(!err)
      console.log('items deleted')
  });
});
db.once('disconnected', function () {
  return console.error('Successfully disconnected from ' + configDB.url);
});
