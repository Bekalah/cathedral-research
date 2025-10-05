module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true
  },
  extends: [
    'eslint:recommended'
  ],
  ignorePatterns: [
    'dist',
    '.eslintrc.js',
    'node_modules',
    '*.min.js',
    'BOOKS/**/*',
    'packages/**/*',
    'exports/**/*',
    'effects/**/*',
    'src/components/**/*',
    'src/hooks/**/*',
    'src/services/**/*',
    'src/engines/CathedralThreeEngine.js',
    'src/CathedralEngine.js',
    'src/EffectsDemo.jsx',
    'src/main.jsx'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    'no-unused-vars': 'warn',
    'no-console': 'off',
    'no-undef': 'error'
  }
};
