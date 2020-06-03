module.exports = (api) => {
  api.cache(true);

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            browsers: ['last 5 Chrome versions', 'last 5 Firefox versions', 'Edge 79'],
          },
          useBuiltIns: 'usage',
          corejs: 3,
        },
      ],
      '@babel/preset-typescript',
      '@babel/preset-react',
    ],
    plugins: [
      '@babel/plugin-proposal-function-bind',
      // "@babel/plugin-syntax-class-properties",
      '@babel/plugin-proposal-private-methods',
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-optional-chaining',
      '@babel/plugin-syntax-dynamic-import',
      'babel-plugin-styled-components',
    ],
  };
};
