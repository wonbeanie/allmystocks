const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require("path");
const webpack = require('webpack');

module.exports = (argv) => {
  const prod = argv.mode === "production";

  return {
    mode: prod ? "production" : "development",
    devtool: prod ? "hidden-source-map" : "eval",
    entry: "./src/index.tsx",
    output: {
      path: path.join(__dirname, "/build"),
      filename: "index.js",
    },
    devServer: {
      port: 3000,
      hot: true,
    },
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: ["babel-loader", "ts-loader"],
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: ['style-loader', 'css-loader', 'sass-loader']
        },
      ],
    },
    plugins: [
      new webpack.ProvidePlugin({
        React: "react",
      }),
      new HtmlWebpackPlugin({
        template: './public/index.html',
        minify: process.env.NODE_ENV === 'production' ? {
          collapseWhitespace: true,
          removeComments: true,
        } : false,
      }),
      new CleanWebpackPlugin(),
    ],
  }
};