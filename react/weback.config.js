var webpack = require('webpack'),
	path 	= require('path');

var config = {
	entry: ['./js/app2'],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	}
};

module.exports = config;