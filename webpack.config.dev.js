const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

process.env.NODE_ENV = "development";

module.exports = {
  mode: "development",
  target: "web",
  devtool: "cheap-module-source-map",
  entry: "./src/index",
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
    filename: "bundle.js"
  },
  devServer: {
    // bonjour: true,
    // contentBase: path.join(__dirname, "src"),
    hot: true,
    // stats: "minimal",
    overlay: true,
    historyApiFallback: true,
    public: "0.0.0.0:3000", // in ASF is METADATA.public,
    disableHostCheck: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization"
    },
    host: "0.0.0.0",
    port: 3000,
    https: false,
    proxy: {
      host: "0.0.0.0",
      protocol: "http:",
      port: 8080,
      "*": "http://0.0.0.0:8080",
      changeOrigin: true,
      secure: false,
      https: false,
      "/": {
        target: "http://0.0.0.0:8080",
        changeOrigin: true
      }
    }
    // proxy: {
    // host: "0.0.0.0",
    // protocol: "http:",
    // port: 8080,
    // "*": "http://[::1]:8080",
    // changeOrigin: true,
    // secure: false,
    // https: false,
    //   // "/": {
    //   //   target: "http://localhost:8080",
    //   //   changeOrigin: true,
    //   //   secure: false,
    //   //   // pathRewrite: { "^/": "" }
    //   // }
    // }
    // Send API requests on localhost to API server get around CORS.
    // proxy: {
    //   "/": "http://localhost:8080"
    //   // {
    //   //   target: {
    //   //     host: "0.0.0.0",
    //   //     protocol: "http:",
    //   //     port: 8080
    //   //   },
    //   //   // pathRewrite: {
    //   //   //    '^/': ''
    //   //   // }
    //   // }
    // }
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      "process.env.API_URL": JSON.stringify("http://[::1]:8080")
    }),
    new HtmlWebpackPlugin({
      template: "src/index.html",
      favicon: "src/favicon.ico"
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
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
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  }
};
