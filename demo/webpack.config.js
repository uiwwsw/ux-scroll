const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    "index.js": [path.resolve(__dirname, "./src/index.ts")],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
          {
            loader: "ts-loader",
          },
        ],
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
  plugins: [new MiniCssExtractPlugin({ filename: "./style.css" })],
  // output: {
  //   filename: "bundle.js",
  //   path: path.resolve(__dirname, "dist"),
  // },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name]",
    library: "ux-scroll",
    libraryTarget: "umd",
    globalObject: "this",
    umdNamedDefine: true,
  },
};
