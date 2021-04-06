module.exports = {
  presets: ['@acot/wcag'],
  extends: ['preset:@acot/wcag/recommended'],
  origin: 'http://localhost:6006',
  connection: {
    command: 'yarn storybook',
    timeout: 300000,
  },
  runner: {
    uses: '@acot/storybook',
  },
  rules: {
    '@acot/wcag/interactive-has-enough-size': 'warn',
    '@acot/wcag/page-has-valid-lang': 'off',
    '@acot/wcag/page-has-title': 'off',
    '@acot/wcag/link-has-name': 'off',
    '@acot/wcag/interactive-has-name': 'off',
    '@acot/wcag/interactive-supports-focus': 'off',
    '@acot/wcag/focusable-has-indicator': 'off',
  },
}
