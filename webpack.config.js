module.exports = {
  entry: "./lib/dota.js",
  output: {
    filename: "./bundle.js"
  },
  devtool: 'source-map',
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
};
