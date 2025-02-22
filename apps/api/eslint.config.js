import { reactInternal } from '@workspace/eslint-config/react-internal'

/** @type {import("eslint").Linter.Config} */
export default reactInternal({
  languageOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    parserOptions: {
      projectService: true,
      tsconfigRootDir: import.meta.dirname
    }
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-floating-promises': 'warn',
    '@typescript-eslint/no-unsafe-argument': 'warn'
  }
})
