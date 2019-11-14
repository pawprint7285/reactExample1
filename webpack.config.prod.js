const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const webpackBundleAnalyzer = require("webpack-bundle-analyzer");

process.env.NODE_ENV = "production";

module.exports = {
  mode: "production",
  target: "web",
  devtool: "source-map",
  entry: "./src/index",
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
    filename: "bundle.js"
  },
  plugins: [
    // Display bundle stats
    // new webpackBundleAnalyzer.BundleAnalyzerPlugin({ analyzerMode: "static" }),

    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css"
    }),

    new webpack.DefinePlugin({
      // This global makes sure React is built in prod mode.
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      "process.env.API_URL": JSON.stringify("http://0.0.0.0:8080")
    }),
    new HtmlWebpackPlugin({
      template: "src/index.html",
      favicon: "src/favicon.ico",
      minify: {
        // see https://github.com/kangax/html-minifier#options-quick-reference
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ["babel-loader", "eslint-loader"]
      },
      {
        test: /\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192
            }
          }
        ]
      },
      {
        test: /(\.(s*)css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: () => [require("cssnano")],
              sourceMap: true
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  }
};
