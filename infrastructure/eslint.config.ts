import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist', 'node_modules']),
  js.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      globals: globals.browser,
      parserOptions: { projectService: true },
    },
  },
  {
    rules: {
      // конфликтует с no-non-null-assertion из strict-набора
      '@typescript-eslint/non-nullable-type-assertion-style': 'off',
    },
  },
  prettier,
]);
