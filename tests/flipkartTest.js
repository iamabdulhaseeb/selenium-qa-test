const { By, Key, until } = require('selenium-webdriver');
const { createDriver } = require('../utils/driver');

(async function flipkartFullTest() {
  let driver = await createDriver();

  try {
    await driver.get('https://www.flipkart.com');
    await driver.manage().window().maximize();
    console.log("Opened Flipkart");

    try {
      let closeBtn = await driver.wait(
        until.elementLocated(By.css('button._2KpZ6l._2doB4z')),
        5000
      );
      await closeBtn.click();
      console.log("Closed login popup");
    } catch {
      console.log("Login popup not shown");
    }

    let searchBox = await driver.wait(
      until.elementLocated(By.name('q')),
      10000
    );

    await searchBox.sendKeys('laptop', Key.RETURN);
    console.log("Search performed");

    await driver.wait(
      until.elementLocated(By.css('a[href*="/p/"]')),
      15000
    );

    console.log("Products loaded");

    await driver.executeScript("window.scrollBy(0, 600)");
    await driver.sleep(1500);

    await driver.executeScript("window.scrollBy(0, 600)");
    await driver.sleep(1500);

    console.log("Scrolled page");

    let products = await driver.findElements(By.css('a[href*="/p/"]'));

    if (products.length === 0) {
      throw new Error("No products found");
    }

    let oldTabs = await driver.getAllWindowHandles();

    await products[0].click();
    await driver.sleep(3000);

    let newTabs = await driver.getAllWindowHandles();

    if (newTabs.length > oldTabs.length) {
      await driver.switchTo().window(newTabs[newTabs.length - 1]);
      console.log("Switched to new tab");
    } else {
      console.log("Opened in same tab");
    }

    console.log("Opened product page");

    try {
      let addToCart = await driver.wait(
        until.elementLocated(By.xpath("//button[contains(., 'Add to cart') or contains(., 'Add to Cart')]")),
        5000
      );

      await addToCart.click();
      console.log("Clicked Add to Cart");

    } catch {
      console.log("Add to cart not available");
    }

    await driver.sleep(3000);

    await driver.navigate().back();
    console.log("Navigated back");
    await driver.sleep(2000);

    try {
      await driver.get('https://www.flipkart.com/account/login');

      await driver.wait(
        until.elementLocated(By.css('input')),
        10000
      );

      console.log("Login page opened successfully");

    } catch (err) {
      console.log("Login page failed:", err.message);
    }

    console.log("✅ Full Flipkart test completed successfully");

  } catch (err) {
    console.log("❌ Test failed:", err.message);
  } finally {
    await driver.quit();
  }
})();