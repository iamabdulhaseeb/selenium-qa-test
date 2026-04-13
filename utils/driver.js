const { Builder } = require('selenium-webdriver');

async function createDriver() {
  return await new Builder().forBrowser('chrome').build();
}
//This creates the WebDriver instance for the browser
module.exports = { createDriver };
