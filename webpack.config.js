const path = require('path');

module.exports = {
  entry: path.join(__dirname, "src/components/index.js"),
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: "index.js",
    library: 'uikid',
    libraryTarget: 'umd'
  },
  externals: {
    "react": "umd react",
    "react-dom": "umd react-dom",
    "styled-components": "umd styled-components",
    "react-select": "umd react-select",
    "react-text-mask": "umd react-text-mask",
    "text-mask-addons": "umd text-mask-addons"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    alias: {
      "react": path.resolve('./node_modules/react')
    },
    extensions: [".js", ".jsx"]
  }
};