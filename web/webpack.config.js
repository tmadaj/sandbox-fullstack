/* eslint-env node */
const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const { getIfUtils } = require('webpack-config-utils');
const dotenv = require('dotenv').config().parsed;
const devServerConfig = require('./webpackConfig/webpack.dev.server');
const prodServerConfig = require('./webpackConfig/webpack.prod.server');
const buildConfig = require('./webpackConfig/webpack.build');

const dotenvKeys = Object.keys(dotenv).reduce((prev, next) => {
  return {
    ...prev,
    [`process.env.${next}`]: JSON.stringify(dotenv[next]),
  };
}, {});

const baseConfig = (env) => {
  const outputPath = path.resolve(__dirname, 'dist');
  const { ifProd, ifNotProd } = getIfUtils(env);
  const output = {
    filename: 'bundle.js',
    path: outputPath,
    pathinfo: ifNotProd(),
    publicPath: '/dist/',
  };

  return {
    mode: ifProd('production', 'development'),
    context: __dirname,
    entry: './src/index.tsx',
    output,
    module: {
      rules: [
        {
          enforce: 'pre',
          use: ['stylelint-custom-processor-loader', 'eslint-loader'],
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
        },
        {
          use: ['babel-loader'],
          test: /\.(ts|js)x?$/,
          exclude: [
            /node_modules/,
            /\.test\./,
            /\.story\./,
            /__tests__/,
            /__snapshots__/,
            /__stories__/,
          ],
        },
        {
          use: [
            {
              loader: 'html-loader',
              options: { minimize: ifProd() },
            },
          ],
          test: /\.html$/,
        },
        {
          test: /\.(png|jpg|gif|svg)$/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192, // Default fallback to file-loader
              },
            },
          ],
          include: [
            path.resolve(__dirname, 'assets/icons'),
            path.resolve(__dirname, 'assets/images'),
          ],
        },
        // {
        //   use: 'file-loader',
        //   test: /\.(eot|woff2|woff|ttf|otf|svg)/,
        //   include: [path.resolve(__dirname, 'assets/fonts')],
        // },
      ],
    },
    plugins: [new webpack.DefinePlugin(dotenvKeys)],
    devtool: ifNotProd('source-map'),
    optimization: {
      noEmitOnErrors: true,
    },
    resolve: {
      alias: {
        api: path.resolve(__dirname, 'src/api/'),
        assets: path.resolve(__dirname, 'assets/'),
        components: path.resolve(__dirname, 'src/components/'),
        screens: path.resolve(__dirname, 'src/screens/'),
        src: path.resolve(__dirname, 'src/'),
        styles: path.resolve(__dirname, 'src/styles/'),
        utils: path.resolve(__dirname, 'src/utils/'),
      },
      extensions: ['.ts', '.tsx', '.js', '.json'],
      symlinks: true,
    },
    bail: true,
    stats: {
      colors: true,
    },
  };
};

module.exports = (env) => {
  if (env.dev === 'HMR') {
    return merge(baseConfig(env), devServerConfig(env));
  }
  if (env.prod === 'server') {
    return merge(baseConfig(env), prodServerConfig(env));
  }
  return merge(baseConfig(env), buildConfig(env));
};
