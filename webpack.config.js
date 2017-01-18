var webpack = require("webpack");

module.exports = {
  entry: "./lib/dota.js",
  output: {
    filename: "./bundle.js"
  },
  resolve: {
    extensions: ["", ".js"]
  },
  module: {
  loaders:
    [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  devtool: 'source-map',
  // plugins: [
  //   new webpack.optimize.UglifyJsPlugin({minimize: true})
  // ],
};
