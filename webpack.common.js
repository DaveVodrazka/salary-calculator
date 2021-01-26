const path = require('path');
const autoprefixer = require('autoprefixer');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: ['./src/index.js', './src/main.scss'],
	module: {
		rules: [
			{
				exclude: /node_modules/,
				test: /\.js$/,
				use: ['babel-loader'],
			},
			{
				test: /\.(scss)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].css',
						},
					},
					{
						loader: 'extract-loader',
					},
					{
						// translates CSS into CommonJS modules
						loader: 'css-loader',
					},
					{
						// Run postcss actions
						loader: 'postcss-loader',
						options: {
							// `postcssOptions` is needed for postcss 8.x;
							// if you use postcss 7.x skip the key
							postcssOptions: {
								// postcss plugins, can be exported to postcss.config.js
								plugins: () => [autoprefixer()],
							},
						},
					},
					{
						// compiles Sass to CSS
						loader: 'sass-loader',
					},
				],
			},
		],
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, './dist'),
	},
	plugins: [
		new CopyPlugin({
			patterns: [{ from: path.resolve(__dirname, 'src', 'index.html') }],
		}),
	],
};
