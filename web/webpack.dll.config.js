const webpack = require('webpack');
const rimraf = require('rimraf');
const path = require('path');
const { getIfUtils } = require('webpack-config-utils');

module.exports = (env) => {
  const { ifProd } = getIfUtils(env);
  const outputPath = path.resolve('dist');

  rimraf('./dist/', [], console.error);

  return {
    mode: ifProd('production', 'development'),
    context: __dirname,
    entry: {
      ReactLibs: [
        'lodash',
        'react',
        'react-dom',
        'react-redux',
        'react-router-dom',
        'redux',
        'styled-components',
      ],
    },
    output: {
      filename: '[name].dll.js',
      path: outputPath,
      library: '[name]_[hash]',
    },
    optimization: {
      minimize: ifProd(), // TODO: terser-webpack-plugin
    },
    plugins: [
      new webpack.DllPlugin({
        name: '[name]_[hash]',
        path: path.join(outputPath, '[name].json'),
      }),
    ],
  };
};
