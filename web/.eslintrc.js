const webpackConfig = require('./webpack.config.js');

module.exports = {
  extends: [
    'airbnb', // Extends eslint-plugin-react
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended', // From @typescript-eslint/eslint-plugin
    'prettier', // eslint-config-prettier: only disables rules that would conflict with prettier
    'prettier/@typescript-eslint', // Uses `eslint-config-prettier` to disable ESLint rules from `@typescript-eslint/eslint-plugin` that would conflict with prettier
    'prettier/babel', // Uses `eslint-config-prettier` to disable ESLint rules from `eslint-plugin-react` that would conflict with prettier
    'prettier/react',
    'plugin:prettier/recommended', // Enables `eslint-plugin-prettier`: displays prettier errors as ESLint errors. Must be last.
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  env: {
    browser: true,
    es6: true,
  },
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      node: {
        // Resolve node std libs in webpack
        extensions: ['.js', '.ts'],
      },
      webpack: {
        // Import path aliases
        config: {
          resolve: webpackConfig('dev').resolve,
        },
      },
    },
  },
  rules: {
    'no-console': ['warn', { allow: ['error', 'warn', 'info'] }],
    'no-plusplus': 'off',
    'no-underscore-dangle': 'off', // MongoDB _id
    'import/extensions': [
      'error',
      'ignorePackages',
      { ts: 'never', tsx: 'never', js: 'never', jsx: 'never' },
    ], // webpack.resolve.extensions
    '@typescript-eslint/explicit-function-return-type': ['error', { allowExpressions: true }],
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-no-bind': [
      'error',
      {
        ignoreRefs: true,
        allowArrowFunctions: false, // true in eslint-config-airbnb
        allowFunctions: false,
        allowBind: false,
        ignoreDOMComponents: true,
      },
    ],
    'prettier/prettier': 'error',
  },
  overrides: [
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off', // Not sure why typescript picks up babel.config.js for example
        '@typescript-eslint/no-var-requires': 'off', // Need to have `const x = require('x')` style imports in webpack configs
      },
    },
  ],
};
