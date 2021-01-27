const CopyWebpackPlugin = require('copy-webpack-plugin');
<<<<<<< HEAD
const path = require('path');
const rules = require('./webpack.rules');

const assets = ['fonts', 'images', 'icons'];
=======
const rules = require('./webpack.rules');

const assets = ['fonts', 'images'];
const path = require('path');
>>>>>>> 1f27426640dd0cc899182abbaec6e45c0e69c08a

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
}, {
  test: /\.(png|jpg|jpeg|gif)$/,
  loader: 'file-loader',
});

module.exports = {
  // Put your normal webpack config below here
  module: {
    rules,
  },
  plugins: assets.map((asset) => new CopyWebpackPlugin({
    patterns: [
      {
        from: path.resolve(__dirname, 'src/assets', asset),
        to: path.resolve(__dirname, '.webpack/renderer', asset),
      },
      {
        from: path.resolve(__dirname, 'src/assets', asset),
        to: path.resolve(__dirname, '.webpack/main', asset),
      },
    ],
  })),
};
