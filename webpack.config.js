const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'public/js'),
    filename: 'bundle.js',
  },
  experiments: {
    // https://webpack.js.org/configuration/experiments/
    topLevelAwait: true
  },
  watch: true
};

