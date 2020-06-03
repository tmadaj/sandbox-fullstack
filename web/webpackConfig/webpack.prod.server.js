const webpack = require('webpack');
const path = require('path');
const { removeEmpty } = require('webpack-config-utils');
const CompressionPlugin = require('compression-webpack-plugin');
const getIPAddress = require('./utils.js');

const config = () => {
  const port = 10007;
  const outputPath = path.resolve(process.cwd(), 'dist');
  const output = {
    filename: 'bundle.js',
    path: outputPath,
    pathinfo: true,
    publicPath: `http://${getIPAddress()}:${port}/dist/`,
  };
  const devServer = {
    compress: true,
    clientLogLevel: 'info',
    disableHostCheck: true,
    historyApiFallback: true,
    host: getIPAddress(),
    port,
  };

  return {
    output,
    optimization: {
      minimize: true, // TODO: terser-webpack-plugin
    },
    devServer,
    plugins: removeEmpty([
      new webpack.DllReferencePlugin({
        context: process.cwd(),
        manifest: path.join(outputPath, 'ReactLibs.json'),
      }),
      new CompressionPlugin(),
    ]),
  };
};

module.exports = (env) => config(env);
