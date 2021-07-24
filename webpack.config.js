const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    app: './src/app.js'
  },

  watch: true,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "[contenthash].bundle.js",
  },
  resolve: {
    extensions: [".json", ".js", ".jsx", "*",],
  },

  module: {
    rules: [
      {
         test: /\.pug$/,
         use: ["pug-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.pug'
    })
  ],
};
