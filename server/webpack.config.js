const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './src/index.js', // replace with your entry point
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  target: 'node', // important for Node.js
  externals: [nodeExternals()], // to exclude node_modules from the bundle
};
