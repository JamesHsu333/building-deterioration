const autoprefixer = require('autoprefixer')
const extractTextWebpackPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  devServer: {
    allowedHosts: ['zoro.ee.ncku.edu.tw'],
    contentBase: false,
    host: '0.0.0.0',
    stats: { colors: true, modules: false },
  },
  entry: './app/app.js',
  module: {
    rules: [
      { test: /\.css$/, use: extractTextWebpackPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader',
      })},
      { test: /\.(eot|ico|jpg|png|svg|ttf|woff|woff2)($|\?)/, use: 'file-loader?name=[hash:5].[ext]' },
      { test: /\.sass$/, use: extractTextWebpackPlugin.extract({
        fallback: 'style-loader',
        use: [
          'css-loader',
          { loader: 'postcss-loader', options: { plugins: [ autoprefixer ] } },
          'sass-loader',
        ],
      })},
      { test: /\.vue$/, use: { loader: 'vue-loader', options: {
        loaders: { sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax' },
        postcss: { plugins: [autoprefixer] },
      }}},
    ],
  },
  output: {
    filename: 'app.js',
    path: `${__dirname}/dist`,
  },
  plugins: [ new extractTextWebpackPlugin('app.css') ],
}

if ('production' === process.env.NODE_ENV) {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      output: { comments: false },
    })
  )
}

// vi:et:sw=2:ts=2
