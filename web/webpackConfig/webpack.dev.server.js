const webpack = require('webpack');
const path = require('path');
const { removeEmpty } = require('webpack-config-utils');
const getIPAddress = require('./utils.js');

const config = () => {
  const port = 10007;
  const hotMiddleware = ['react-hot-loader/patch'];
  const hotUpdateFilenames = {
    hotUpdateChunkFilename: 'hot/[id].[hash].hot-update.js',
    hotUpdateMainFilename: 'hot/[hash].hot-update.json',
  };
  const outputPath = path.resolve(process.cwd(), 'dist');
  const output = {
    filename: 'bundle.js',
    path: outputPath,
    pathinfo: true,
    publicPath: `http://${getIPAddress()}:${port}/dist/`,
    ...hotUpdateFilenames,
  };
  const devServer = {
    compress: true,
    clientLogLevel: 'info',
    disableHostCheck: true,
    historyApiFallback: true,
    host: getIPAddress(),
    hot: true,
    port,
    sockPath: `$/socket`,
    transportMode: 'ws', // Instead of sockjs
  };

  return {
    entry: removeEmpty([...hotMiddleware, './src/index.tsx']),
    output,
    devServer,
    plugins: removeEmpty([
      new webpack.DllReferencePlugin({
        context: process.cwd(),
        manifest: path.join(outputPath, 'ReactLibs.json'),
      }),
      new webpack.HotModuleReplacementPlugin(),
    ]),
  };
};

module.exports = (env) => config(env);
