const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const nodeEnv = process.env.NODE_ENV || 'dev'
const distMinified = (process.env.DIST_MINIFY || 'no') === 'yes'

function chunkSort (a, b) {
  if (a.names[0] === 'OpenAdsDemo') {
    return 1
  } else {
    return b.names[0] === 'OpenAdsDemo' ? -1 : 0
  }
}

var webpackPlugins = [

  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(nodeEnv)
  }),
  new HtmlWebpackPlugin({
    title: 'Open Ads',
    template: 'src/demo/resources/ui/template.html',
    filename: 'index.html',
    chunksSortMode: chunkSort
  }),
  new CopyWebpackPlugin([{
    from: 'src/demo/resources/ui/css',
    to: 'css'
  }]),
  new CopyWebpackPlugin([{
    from: 'src/demo/resources/ui/fonts',
    to: 'fonts'
  }])
]

if (distMinified) {
  webpackPlugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        // Disabled because of an issue with Uglify breaking seemingly valid code:
        // https://github.com/facebookincubator/create-react-app/issues/2376
        // Pending further investigation:
        // https://github.com/mishoo/UglifyJS2/issues/2011
        comparisons: false
      },
      output: {
        comments: false,
        // Turned on because emoji and regex is not minified properly using default
        // https://github.com/facebookincubator/create-react-app/issues/2488
        ascii_only: true
      }
    })
  )
}

module.exports = [
  {
    entry: {
      'OpenAdsDemo': './src/demo/index.js'
    },
    output: {
      path: path.resolve(path.join(__dirname, '/../../../', 'dist')),
      filename: '[name].' + nodeEnv.replace(/"/g, '') + '.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|src\/demo\/webpack)/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.yml$/,
          loader: 'json-loader!yaml-loader'
        }
      ]
    },
    plugins: webpackPlugins
  }
]
