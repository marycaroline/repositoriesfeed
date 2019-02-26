var autoprefixer = require('autoprefixer');
var baseConfig = require('./webpack.base.config');
var webpack = require('webpack')
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var SpritesmithPlugin = require('webpack-spritesmith');
var BundleTracker = require('webpack-bundle-tracker');
var path = require('path');
var nodeModulesDir = path.resolve(__dirname, 'node_modules');

baseConfig[0].mode = 'production'

baseConfig[0].entry = [
  'whatwg-fetch',
  '@babel/polyfill',
  './assets/js/index.js',
]

baseConfig[0].output = {
  path: path.resolve('./assets/webpack_bundles/'),
  publicPath: '',
  filename: '[name]-[hash].js',
}

baseConfig[0].module.rules.push({
  test: /\.jsx?$/,
  exclude: [nodeModulesDir],
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env', '@babel/preset-react'],
    },
  },
},
{
  test: /\.(woff(2)?|eot|ttf)(\?v=\d+\.\d+\.\d+)?$/,
  loader: 'file-loader?name=fonts/[name].[ext]',
});

baseConfig[0].optimization = { minimize: true };

baseConfig[0].plugins = [
  new webpack.DefinePlugin({  // removes React warnings
    'process.env':{
      'NODE_ENV': JSON.stringify('production')
    }
  }),
  new SpritesmithPlugin({
      src: {
        cwd: path.resolve(__dirname, 'assets/images/'),
        glob: '*.png'
      },
      target: {
        image: path.resolve(__dirname, 'assets/images/spritesmith-generated/sprite.png'),
        css: path.resolve(__dirname, 'assets/sass/vendor/spritesmith.scss')
      },
      retina: '@2x'
  }),
  new MiniCssExtractPlugin({ filename: '[name]-[hash].css', disable: false, allChunks: true }),
  new BundleTracker({
    filename: './webpack-stats.json'
  }),
  new webpack.LoaderOptionsPlugin({
    options: {
      context: __dirname,
      postcss: [
        autoprefixer,
      ]
    }
  }),
]

module.exports = baseConfig;
