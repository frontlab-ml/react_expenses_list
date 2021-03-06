const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx",
  mode: "development",

  // Source Map in any files
  devtool: 'inline-source-map',

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json"]
  },

  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "public")
  },

  devServer: {
    contentBase: path.join(__dirname, "public"),
    compress: true,
    hot: true,
    stats: "errors-only",
    open: true
  },

  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader"
      },
      // SCSS and CSS
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      },
      // JavaScript
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
    ]
  },

  plugins: [
    new CleanWebpackPlugin(['public']),

    new HtmlWebpackPlugin({
      title: "Project webpack",
      hash: "true",
      template: "./src/index.html"
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
}



