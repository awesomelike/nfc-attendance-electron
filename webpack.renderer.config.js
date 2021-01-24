const CopyWebpackPlugin = require('copy-webpack-plugin');
const rules = require('./webpack.rules');

const assets = ['fonts', 'images'];
const path = require('path');

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
    ],
  })),
};
