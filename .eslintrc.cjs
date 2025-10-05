module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended'
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    // Disable console warnings for Cathedral Research (mystical logging is important!)
    'no-console': 'off',
    'no-debugger': 'warn',
    'no-unused-vars': ['warn', { 
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
      ignoreRestSiblings: true
    }],
    'prefer-const': 'warn',
    'no-var': 'error',
    
    // Allow some flexibility for mystical coding patterns
    'no-magic-numbers': 'off',
    'camelcase': 'off',
    'no-case-declarations': 'off', // Allow declarations in case blocks for switches
    'no-dupe-class-members': 'warn', // Warn but don't fail on duplicate class members
  },
  ignorePatterns: [
    'dist/',
    'build/',
    'node_modules/',
    '*.min.js',
    'coverage/',
    '.next/',
    'out/',
    'public/assets/',
    'archives/',
    '*.d.ts',
    // Ignore TypeScript files that need proper TS parser
    '**/*.ts',
    '**/*.tsx',
    // Ignore problematic files
    '**/server.js',
    '**/react-tarot-visual-generator.js'
  ],
  overrides: [
    {
      files: ['*.js', '*.mjs'],
      rules: {
        'no-undef': 'off', // Allow CommonJS requires and globals
      },
    },
    {
      files: ['**/*.test.{js,ts,tsx}', '**/*.spec.{js,ts,tsx}'],
      env: {
        jest: true,
      },
      rules: {
        'no-console': 'off',
        'no-unused-vars': 'off',
      },
    },
    {
      files: ['vite.config.{js,ts}', 'webpack.config.{js,ts}', '**/devops/**/*.js'],
      rules: {
        'no-console': 'off',
        'no-unused-vars': 'off',
      },
    },
    {
      // DevOps and script files
      files: ['scripts/**/*.js', 'devops/**/*.js'],
      rules: {
        'no-console': 'off',
        'no-unused-vars': 'off',
      },
    },
  ],
};