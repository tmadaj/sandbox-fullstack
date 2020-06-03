const webpack = require('webpack');
const path = require('path');
const rimraf = require('rimraf');
const { removeEmpty, getIfUtils } = require('webpack-config-utils');
const CompressionPlugin = require('compression-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');

rimraf('./dist/hot/', [], console.error);

const config = (env) => {
  const { ifProd, ifDev } = getIfUtils(env);
  const outputPath = path.resolve(process.cwd(), 'dist');

  return {
    optimization: {
      minimize: ifProd(), // TODO: terser-webpack-plugin
    },
    plugins: removeEmpty([
      new webpack.DllReferencePlugin({
        context: process.cwd(),
        manifest: path.join(outputPath, 'ReactLibs.json'),
      }),
      ifProd(new CompressionPlugin()),
      ifDev(new Visualizer({ filename: './statistics.html' })),
    ]),
  };
};

module.exports = (env) => config(env);
