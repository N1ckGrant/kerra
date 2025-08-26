import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsparser from '@typescript-eslint/parser'
import vueParser from 'vue-eslint-parser'

export default [
  // Base configurations
  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsparser,
        ecmaVersion: 'latest',
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      vue: pluginVue,
    },
    rules: {
      // Vue rules
      'vue/multi-word-component-names': 'off',
      'vue/no-unused-components': 'warn',
      'vue/no-unused-vars': 'warn',
      'vue/require-default-prop': 'off',
      'vue/require-prop-types': 'off',
      
      // General rules
      'no-console': 'warn',
      'no-debugger': 'error',
      'no-unused-vars': 'off',
      'prefer-const': 'error',
      'no-var': 'error',
      'no-undef': 'off',
    },
  },
  
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        global: 'readonly',
        globalThis: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      // TypeScript rules
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      
      // General rules
      'no-console': 'warn',
      'no-debugger': 'error',
      'no-unused-vars': 'off',
      'prefer-const': 'error',
      'no-var': 'error',
      'no-undef': 'off',
      'no-redeclare': 'error',
      'no-unreachable': 'error',
      'no-constant-condition': 'error',
      'no-dupe-args': 'error',
      'no-dupe-keys': 'error',
      'no-empty': 'warn',
      'no-extra-semi': 'error',
      'no-func-assign': 'error',
      'no-invalid-regexp': 'error',
      'no-irregular-whitespace': 'error',
      'use-isnan': 'error',
      'valid-typeof': 'error',
      
      // Code style
      'quotes': ['warn', 'single'],
      'semi': ['warn', 'never'],
      'comma-dangle': ['warn', 'always-multiline'],
    },
  },
  
  // Ignore patterns
  {
    ignores: [
      'node_modules/**',
      '.nuxt/**',
      '.output/**',
      'dist/**',
      'build/**',
      '.cache/**',
    ],
  },
]