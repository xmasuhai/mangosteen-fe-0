import { globalIgnores } from 'eslint/config'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'
import pluginCypress from 'eslint-plugin-cypress'
import pluginVitest from '@vitest/eslint-plugin'
import pluginOxlint from 'eslint-plugin-oxlint'
import skipFormatting from 'eslint-config-prettier/flat'

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{vue,ts,mts,tsx}'],
    rules: {
      'perfectionist/sort-named-imports': 'off',
      'perfectionist/sort-imports': 'off',
      // 1. 允许单行大括号（关键规则）
      "brace-style": ["error", "1tbs", { "allowSingleLine": true }],
      // 2. 强制单行代码块的大括号内部有空格（处理 { return null } 的空格）
      "block-spacing": ["error", "always"],
      // 3. 允许单行中花括号前后有空格（配合 block-spacing）
      "object-curly-spacing": ["error", "always"],
      // 4. 允许按需选择箭头函数是否包含大括号
      'arrow-body-style': ['error', 'as-needed'],
    },
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  ...pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,
  // Cypress
  {
    ...pluginCypress.configs.recommended,
    files: [
      'cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}',
      'cypress/support/**/*.{js,ts,jsx,tsx}',
    ],
  },
  // Vitest
  {
    ...pluginVitest.configs.recommended,
    files: ['src/**/__tests__/*'],
  },
  // Oxlint
  ...pluginOxlint.buildFromOxlintConfigFile('.oxlintrc.json'),
  skipFormatting,
)
