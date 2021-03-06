const {PATHS, PAGES_DIR, ENTRY, PAGES} = require('./files.config.js');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const miniCss = require("mini-css-extract-plugin");
const copyWebpackPlugin = require('copy-webpack-plugin')


console.log(PAGES_DIR);
//TODO mocha tests
//TODO cross-env - WTF
//TODO lint
//TODO dev server
//TODO including script to specific html page (not for all)
module.exports = {
  mode: "development",
  devtool: "source-map", //TODO console parameter with/without maps
  entry: ENTRY,

  watch: true,
  output: {
    path: PATHS.dist,
    filename: "./scripts/[name].bundle.js",
  },

  resolve: { //TODO learn modules
    extensions: [".json", ".js", ".jsx", "*",],
    alias: {
      '~': PATHS.src
    }
  },

  // TODO WTF??? vendors.bundle.js????
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /node_modules/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },

  module: {
    rules: [
      { //for using babel
        test: /\.js$|jsx/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },

      { //For scss
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: miniCss.loader,
            options: {
              esModule: false,
            },
          },
          {
            loader: 'css-loader',
            options: { sourceMap: true }
          }, {
            loader: 'postcss-loader',
            options: { sourceMap: true, postcssOptions: {config: './config/css/postcss.config.js'}}
          }, {
            loader: 'sass-loader',
            options: { sourceMap: true }
          }
        ],
        include: [
          PATHS.style,
        ],
      },

      {//For css
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: miniCss.loader,
            options: {
              esModule: false,
            },
          },
          {
            loader: 'css-loader',
            options: {sourceMap: true}
          }, {
            loader: 'postcss-loader',
            options: { sourceMap: true, postcssOptions: {config: './config/css/postcss.config.js'}}
          }
        ]
      },
      { //For pug
        test: /\.pug$/,
        use: ["pug-loader"],
      },


      //Assets
      {//For png
        test: /\.(png|jpg|gif|svg|ico)$/ ,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        },
      },
      {//For fonts
        test    : /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader  : 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      },
    ],
  },
  plugins: [
    new miniCss({
      filename: "./assets/styles/style.css",
    }),
    new copyWebpackPlugin({
      patterns: [
        {from: `${PATHS.img}`, to: `${PATHS.dist}/assets/img`},
        {from: `${PATHS.fonts}`, to: `${PATHS.dist}/assets/fonts`},
        {from: `${PATHS.static}`, to: `${PATHS.dist}`},
      ]
    }),

    ...PAGES.map(page => new HtmlWebpackPlugin({
      template: `${PAGES_DIR}/${page}`,
      filename: `./${page.replace(/\.pug/,'.html')}`
    }))
  ],
  externals: {
    paths: PATHS
  },
  devServer: {
    port: 8080,
    contentBase: ['./src', './public'], // both src and output dirs
    inline: true,
    hot: true
  },
};
