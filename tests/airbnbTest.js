const { By, Key, until } = require('selenium-webdriver');
const { createDriver } = require('../utils/driver');

(async function airbnbFullTest() {
  let driver = await createDriver();

  // Helper to close most pop-ups and modals that may block interaction
  async function closeModals() {
    try {
      let buttons = await driver.findElements(By.css('button'));

      for (let btn of buttons) {
        let text = await btn.getText().catch(() => "");

        if (
          text.toLowerCase().includes("accept") ||
          text.toLowerCase().includes("agree") ||
          text.toLowerCase().includes("close") ||
          text.toLowerCase().includes("skip")
        ) {
          try {
            await btn.click();
            console.log("Closed modal:", text);
            await driver.sleep(1000);
          } catch (err) {
            // Ignore errors from clicking buttons that are detached or covered
          }
        }
      }
    } catch (err) {
      console.log("No modals found");
    }
  }

  try {
    await driver.get('https://www.airbnb.com');
    await driver.manage().window().maximize();
    console.log("Opened Airbnb");

    // Wait to let any modals/popups show
    await driver.sleep(3000);

    await closeModals();

    // More robust click on search bar, retry if intercepted by modal
    let clickedSearchBar = false;
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        let searchBar = await driver.findElement(
          By.css('[data-testid="structured-search-input-field-query"]')
        );
        await driver.wait(until.elementIsVisible(searchBar), 5000);
        await driver.wait(until.elementIsEnabled(searchBar), 5000);
        // Try clicking, if intercepted, re-close modals and retry
        await searchBar.click();
        console.log("Clicked search bar");
        clickedSearchBar = true;
        break;
      } catch (err) {
        if (err.message && err.message.includes('element click intercepted')) {
          console.log("Click intercepted by modal, attempting to close modals again...");
          await closeModals();
          await driver.sleep(1000);
        } else {
          // If not click interception, break and report
          break;
        }
      }
    }
    if (!clickedSearchBar) {
      console.log("Search bar not found or not clickable after retries, continuing...");
    }

    await driver.sleep(2000);

    await closeModals();

    // Get the search input field (`input[type="search"]`)
    let input;
    try {
      input = await driver.wait(
        until.elementLocated(By.css('input[type="search"], input[name="query"], [data-testid="structured-search-input-field-query"]')),
        15000
      );
      await driver.wait(until.elementIsVisible(input), 5000);
      await driver.wait(until.elementIsEnabled(input), 5000);
    } catch (err) {
      throw new Error("Could not locate the search input field");
    }

    // Another try-catch: click on input, dealing with possible overlays/modals
    let inputClicked = false;
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        await input.click();
        inputClicked = true;
        break;
      } catch (err) {
        if (err.message && err.message.includes('element click intercepted')) {
          console.log("Click intercepted on input, closing modals again...");
          await closeModals();
          await driver.sleep(800);
        } else {
          break;
        }
      }
    }
    if (!inputClicked) {
      throw new Error("Search input not clickable after retries");
    }

    await input.sendKeys('Karachi');
    console.log("Entered location");

    await driver.sleep(1500);
    await input.sendKeys(Key.RETURN);
    console.log("Search submitted");

    await driver.sleep(6000);

    await closeModals();

    // Scroll down to ensure listings load
    await driver.executeScript("window.scrollBy(0, 600)");
    await driver.sleep(1500);
    await driver.executeScript("window.scrollBy(0, 600)");
    await driver.sleep(1500);

    console.log("Scrolled listings");

    // Find listing links
    let listings = await driver.findElements(
      By.css('a[href*="/rooms/"]')
    );

    if (listings.length === 0) {
      throw new Error("No listings found");
    }

    let oldTabs = await driver.getAllWindowHandles();

    await listings[0].click();
    await driver.sleep(3000);

    let newTabs = await driver.getAllWindowHandles();

    if (newTabs.length > oldTabs.length) {
      await driver.switchTo().window(newTabs[newTabs.length - 1]);
      console.log("Switched to listing tab");
    }

    await closeModals();

    await driver.wait(
      until.elementLocated(By.css('h1')),
      10000
    );

    console.log("Listing page loaded");

    // Simulate login flow, if possible
    try {
      await driver.get('https://www.airbnb.com/login');

      await driver.sleep(3000);
      await closeModals();

      let emailInput = await driver.wait(
        until.elementLocated(By.css('input[type="email"], input[type="text"], input[name="email"]')),
        10000
      );

      await emailInput.sendKeys('test@example.com');
      console.log("Login email entered (demo only)");

      console.log("Login flow simulated (OTP not automated)");

    } catch (err) {
      console.log("Login flow skipped:", err && err.message);
    }

    await driver.navigate().back();
    console.log("Back to results");

    await driver.sleep(3000);

    console.log("✅ Airbnb full test completed successfully");

  } catch (err) {
    // Log full error if element click is intercepted, with more info
    if (err.message && err.message.includes("element click intercepted")) {
      console.error("❌ Test failed: Element click intercepted. This usually means a modal or overlay is blocking the element. Please review modal handling and element visibility.", err.message);
    } else {
      console.log("❌ Test failed:", err && err.message);
    }
  } finally {
    await driver.quit();
  }
})();