var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,

  historyApiFallback: true
}).listen(3003, '0.0.0.0', function (err, result) {
  if (err) {
    return console.log(err);
  }
  console.log('Webpack Dev Server listening at http://0.0.0.0:3003/');
});
