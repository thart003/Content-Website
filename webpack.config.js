const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const srcDir = path.resolve(__dirname, 'src'),
  distDir = path.resolve(__dirname, 'dist');

module.exports = {
  mode: 'production',
  entry: { fibonacci: './src/fibonacci.js' },
  plugins: [
    new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns: [
        { from: 'scss', to: 'scss/', context: srcDir },
        { from: 'assets', to: 'assets/', context: srcDir },
        'LICENSE.txt',
        'README.md',
        'package.json'
      ],
    })
  ],
  output: {
    path: distDir
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { import: false }
          },
          'sass-loader',
        ],
      },
      {
        test: /\.js[x]?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  resolve: {
    modules: [path.resolve(__dirname), 'node_modules'],
    extensions: ['.js', '.json', '.css', '.scss', '.sass']
  },
  optimization: {
    minimize: true
  }
};