module.exports = {
    env: {
        'browser': true,
        'es6': true,
        'node':true,

    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended'
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: ['react'],
   
    rules: {
        // Add your ESLint rules here
        // Example:
        'indent': ['error', 4],
        'quotes': ['error', 'single'],
        // ...
    },
};
  