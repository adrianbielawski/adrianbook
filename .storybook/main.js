module.exports = {
  framework: {
    name: "@storybook/react-webpack5",
    options: {}
  },
  core: {
    disableTelemetry: true,
  },
  features: {
    previewMdx2: true,
  },
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app",
    "storybook-color-picker",
    "@storybook/addon-mdx-gfm"
  ],
};
