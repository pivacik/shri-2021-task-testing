module.exports = {
  gridUrl: "http://192.168.31.38:4444/",
  // baseUrl: "https://shri.yandex/hw/store/",

  browsers: {
    chrome: {
      desiredCapabilities: {
        browserName: "chrome",
      },
    },
  },
  plugins: {
    "html-reporter/hermione": {
      path: "hermione-html-report",
    },
  },
};
