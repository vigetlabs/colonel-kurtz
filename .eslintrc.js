var isIntegration = !!process.env.CI

module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    jest: true
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module',
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true
    }
  },
  extends: ['eslint:recommended'],
  plugins: ['react', 'prettier', 'jest'],
  settings: {
    react: {
      version: 'detect'
    }
  },
  ignorePatterns: ['**/vendor/*.js'],
  rules: {
    semi: 'off',
    'no-console': 'off',
    'no-debugger': isIntegration ? 'error' : 'off',
    'no-unused-vars': [
      1,
      { args: 'none', ignoreRestSiblings: true, varsIgnorePattern: '^_' }
    ],
    'no-return-assign': 'error',
    'react/jsx-no-duplicate-props': ['warn', { ignoreCase: true }],
    'react/jsx-no-undef': 'error',
    'react/jsx-uses-react': 'warn',
    'react/jsx-uses-vars': 'warn',
    'react/no-danger-with-children': 'warn',
    'react/no-deprecated': 'warn',
    'react/no-direct-mutation-state': 'warn',
    'react/no-is-mounted': 'warn',
    'react/react-in-jsx-scope': 'error',
    'react/require-render-return': 'warn',
    'react/style-prop-object': 'warn',
    'prettier/prettier': isIntegration ? 'error' : 'warn'
  }
}
