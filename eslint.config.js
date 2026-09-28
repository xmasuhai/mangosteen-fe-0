import antfu from '@antfu/eslint-config'

export default antfu({
  unocss: true,
  vue: true,
  reules: {
    "perfectionist/sort-imports": "false"
    "style/jsx-closing-bracket-location": "false"
  }
})
