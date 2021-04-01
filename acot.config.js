module.exports = {
  presets: ['@acot/wcag'],
  extends: ['preset:@acot/wcag/recommended'],
  origin: 'http://localhost:6006',
  connection: {
    command: 'yarn storybook',
    timeout: 600000,
  },
  runner: {
    uses: '@acot/storybook',
  },
  rules: {
    '@acot/wcag/interactive-has-enough-size': 'warn',
    '@acot/wcag/page-has-valid-lang': 'off',
  },
}
