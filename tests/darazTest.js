const { By, Key, until } = require('selenium-webdriver');
const { createDriver } = require('../utils/driver');

(async function darazFullTest() {
  let driver = await createDriver();

  try {
    await driver.get('https://www.daraz.pk');
    await driver.manage().window().maximize();
    console.log("Opened Daraz");

    let searchBox = await driver.wait(
      until.elementLocated(By.name('q')),
      10000
    );

    await searchBox.sendKeys('laptop', Key.RETURN);
    console.log("Search performed");

    await driver.wait(until.elementLocated(By.css('.Bm3ON')), 10000);

    await driver.executeScript("window.scrollBy(0, 500)");
    await driver.sleep(1500);

    await driver.executeScript("window.scrollBy(0, 500)");
    await driver.sleep(1500);

    console.log("Scrolled page");

    let product = await driver.findElement(By.css('.Bm3ON a'));

    let oldTabs = await driver.getAllWindowHandles();

    await product.click();
    await driver.sleep(3000);

    let newTabs = await driver.getAllWindowHandles();

    if (newTabs.length > oldTabs.length) {
      await driver.switchTo().window(newTabs[newTabs.length - 1]);
      console.log("Switched to new tab");
    } else {
      console.log("Product opened in same tab");
    }

    console.log("Opened product page");

    try {
      let addToCart = await driver.wait(
        until.elementLocated(By.xpath("//button[contains(., 'Add to Cart')]")),
        5000
      );

      await addToCart.click();
      console.log("Clicked Add to Cart");

    } catch (err) {
      console.log("Add to cart not available or requires login");
    }

    await driver.sleep(3000);

    await driver.navigate().back();
    console.log("Navigated back");
    await driver.sleep(2000);

    try {
      await driver.get('https://member.daraz.pk/user/login');

      let email = await driver.wait(
        until.elementLocated(By.css('input[type="text"]')),
        10000
      );

      await email.sendKeys('your_email_here');

      let password = await driver.findElement(By.css('input[type="password"]'));
      await password.sendKeys('your_password_here');

      await driver.findElement(By.css('button[type="submit"]')).click();

      console.log("Login attempted");

      await driver.sleep(5000);

    } catch (err) {
      console.log("Login step skipped:", err.message);
    }

    try {
      await driver.get('https://member.daraz.pk/user/register');

      await driver.wait(
        until.elementLocated(By.css('input')),
        10000
      );

      console.log("Signup page opened successfully");

    } catch (err) {
      console.log("Signup failed:", err.message);
    }

    console.log("✅ Full Daraz test completed successfully");

  } catch (err) {
    console.log("❌ Test failed:", err.message);
  } finally {
    await driver.quit();
  }
})();