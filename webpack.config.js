const path = require('path');

module.exports = {
  context: __dirname,
  entry: './javascripts/game.js',
  output: {
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '*']
  },
};
