const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const miniCss = require("mini-css-extract-plugin");

module.exports = {
  mode: "development", //TODO console parameter for development/prod
  devtool: "source-map", //TODO console parameter with/without maps
  entry: {
    app: './src/app.js'
  },

  watch: true,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "[name].bundle.js",
  },

  // resolve: { TODO learn modules
  //   extensions: [".json", ".js", ".jsx", "*",],
  // },

  module: {
    rules: [
      { //for using babel
        test: /^app\/\S*\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },

      { //For scss
        test: /\.(s*)css$/,
        use: [miniCss.loader, "css-loader", "sass-loader"],
      },
      { //For pug
         test: /\.pug$/,
         use: ["pug-loader"],
      },
    ],
  },
  plugins: [
    new miniCss({ //TODO wtf is this
      filename: "./styles/style.css",
    }),
    new HtmlWebpackPlugin({
      template: './src/index.pug'
    })
  ],
};
