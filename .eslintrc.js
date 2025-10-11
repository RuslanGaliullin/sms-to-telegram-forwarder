module.exports = {
  root: true,
  extends: [
    '@react-native',
    'airbnb',
    'airbnb/hooks',
  ],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/prop-types': 'off',
    'no-console': 'off',
    'import/no-unresolved': 'off',
    'react/react-in-jsx-scope': 'off',
    'import/prefer-default-export': 'off',
    'no-use-before-define': ['error', { variables: false }],
    'react/jsx-props-no-multi-spaces': 'off',
  },
  overrides: [
    {
      files: ['**/__tests__/**/*.js', '**/*.test.js'],
      env: {
        jest: true,
      },
      rules: {
        'react/jsx-props-no-multi-spaces': 'off',
        'global-require': 'off',
        'no-undef': 'off',
      },
    },
  ],
};
