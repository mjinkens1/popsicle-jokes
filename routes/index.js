const express = require('express');
const router = express.Router();
const path = require('path');
const Content = require('../models/content');

/* GET home page. */
router.get('/data', function(req, res, next) {
  Content.find(req.body, function(err, content) {
    if(err){
       console.error(err);
    } else{
      // res.send('test res')
      res.send(content);
    };
  });
});

module.exports = router;
