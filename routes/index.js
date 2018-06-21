const express = require('express');
const router = express.Router();
const path = require('path');
const Content = require('../models/content');


router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/../build', 'index.html'));
});

router.get('/data', function(req, res, next) {
  Content.find(req.body, function(err, content) {
    if(err){
       console.error(err);
    } else{
      res.send(content);
    };
  });
});

module.exports = router;
