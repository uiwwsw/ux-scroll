const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    "dist/index.js": [path.resolve(__dirname, "./index.ts")],
    "demo/demo.js": [path.resolve(__dirname, "./demo/demo.ts")],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-typescript"],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          // Creates `style` nodes from JS strings
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },
  resolve: {
    extensions: [".ts"],
  },
  plugins: [new MiniCssExtractPlugin({ filename: "style.css" })],
  // output: {
  //   filename: "bundle.js",
  //   path: path.resolve(__dirname, "dist"),
  // },
  output: {
    path: path.resolve(__dirname, "./"),
    filename: "[name]",
    library: "ui-scroll",
    libraryTarget: "umd",
    globalObject: "this",
    umdNamedDefine: true,
  },
};
