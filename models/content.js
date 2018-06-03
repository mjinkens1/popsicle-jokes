const mongoose = require('mongoose');

var contentSchema = mongoose.Schema({
    content: {
      joke: String,
      punchline: String,
      nsfw: Boolean
    }
});

module.exports = mongoose.model('Content', contentSchema);
