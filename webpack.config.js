module.exports = {
  entry: "./lib/dota.js",
  output: {
    filename: "./bundle.js"
  },
  devtool: 'source-map',
  resolve: {
    extensions: ["", ".js"]
  }
};
