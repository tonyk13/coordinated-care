const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "x8vfgc",

  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    REACT_APP_API_URL: 'https://coordinated-care-cce88007d728.herokuapp.com',
  }
});
