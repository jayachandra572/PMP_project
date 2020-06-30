module.exports = {
   stories: ['../src/**/*.stories.{js,tsx,ts}'],
   addons: [
      '@storybook/preset-create-react-app',
      '@storybook/addon-actions',
      '@storybook/addon-links',
      '@storybook/addon-storysource',
      '@storybook/addon-knobs/register',
      '@storybook/addon-docs/preset'
   ]
}
