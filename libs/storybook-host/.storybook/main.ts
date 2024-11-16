import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  stories: ['../src/lib/**/*.@(mdx|stories.@(js|jsx|ts|tsx))', '../../**/src/**/*.@(mdx|stories.@(js|jsx|ts|tsx))'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@nx/react/plugins/storybook',
    '@chromatic-com/storybook',
  ],

  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },

  // To customize your webpack configuration you can use the webpackFinal field.
  // Check https://storybook.js.org/docs/react/builders/webpack#extending-storybooks-webpack-config
  // and https://nx.dev/recipes/storybook/custom-builder-configs
  webpackFinal: async (config) => {
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        'next/font/local': require.resolve('./font.mock.ts'),
      };
    }
    return config;
  },

  docs: {},

  // typescript: {
  //   reactDocgen: 'react-docgen-typescript'
  // }
};

export default config;
