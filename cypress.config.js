const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'x8vfgc',
  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },


});
