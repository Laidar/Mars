const path = require('path');
const webpack = require('webpack');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const CleanWebpackPlugin = require('clean-webpack-plugin');

// const ExtractTextPlugin = require('extract-text-webpack-plugin');

// const sass =  {
//   test: /\.sass$/,
//   use: ExtractTextPlugin.extract({
//     fallback: 'style-loader',
//     use: ['css-loader', 'sass-loader']
//   })
// }

// let pathsToClean = [
//   'dist',
//   'build'
// ]

// let cleanOptions = {
//   root:     '/full/webpack/root/path',
//   verbose:  true,
//   dry:      false
// }

const pug = {
	test: /\.pug$/,
	use: [
		{
			loader: 'html-loader?attrs=false'
		},

		{
			loader: 'pug-html-loader',
			options: {
				pretty: true
			}
		}]
}
const sass = {
	test: /\.(sa|sc|c)ss$/,
	use: [
		{
			loader: MiniCssExtractPlugin.loader,
		},
		{
			loader: 'css-loader'
		},
		{
				loader: 'postcss-loader',
				options: {
						plugins: [
								autoprefixer({
										browsers:['ie >= 8', 'last 4 version'],
										grid: true
								})
						]
				}
		},
		{
				loader: 'sass-loader'
		}
	],
}

const images = {
  test: /\.(png|svg|jpg|gif)$/,
  use: {
		loader: 'file-loader',
		options: {
			name: 'assets/images/[folder]/[name].[ext]',
			publicPath: function(url) {
				return url.replace(/assets/, '..')
			},
		}
	}
}

const fonts = {
	test: /\.(eot|woff|woff2|ttf)([\?]?.*)$/,
	use: {
		loader: 'file-loader',
		options: {
			name: 'assets/fonts/[name].[ext]',
			publicPath: function(url) {
				return url.replace(/assets/, '..')
			},
		}
	}
}

module.exports = {
  entry: './src/pages/index/index.js',
  output: {
		path: path.resolve(__dirname, 'dist'),
		// filename:'assets/scripts/[name].bundle.js',
		filename:'assets/scripts/index.bundle.js',
    publicPath: "dist",
  },
  module: {
		rules: [sass, pug, images, fonts],
	},
  plugins: [
		// new CleanWebpackPlugin(pathsToClean, cleanOptions),
    new HtmlWebpackPlugin({
			filename: 'index.html',
      template: 'src/pages/index/index.pug',
			inject: false,
		}),
		new CopyWebpackPlugin([{ from: "./src/assets/images/", to: "./assets/images" } ]),
    new MiniCssExtractPlugin({
      filename: 'assets/styles/styles.css',
    }),
    // new ExtractTextPlugin('styles.css'),
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			"window.jQuery": "jquery"
		}),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      server: { baseDir: ['dist'] }
    })
  ],
};