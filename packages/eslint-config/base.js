import js from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import onlyWarn from 'eslint-plugin-only-warn'
import turboPlugin from 'eslint-plugin-turbo'
import tseslint from 'typescript-eslint'
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort'
import tailwind from 'eslint-plugin-tailwindcss'

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config}
 * */
export const config = [
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  ...tailwind.configs['flat/recommended'],
  {
    plugins: {
      turbo: turboPlugin,
      simpleImportSort: simpleImportSortPlugin
    },
    rules: {
      'turbo/no-undeclared-env-vars': 'warn',
      'simpleImportSort/imports': ['warn'],
      'simpleImportSort/exports': 'warn',
      'tailwindcss/no-custom-classname': 'off',
      'tailwindcss/classnames-order': 'off'
    }
  },
  {
    plugins: {
      onlyWarn
    }
  },
  {
    ignores: ['dist/**']
  }
]
