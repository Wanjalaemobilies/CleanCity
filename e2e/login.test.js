const { Builder, By, until } = require('selenium-webdriver');

(async function loginTest() {
  // Start browser
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    // Go to the login page
    await driver.get('http://localhost:3000/login');

    // Find and fill in email
    const emailInput = await driver.findElement(By.id('login-email'));
    await emailInput.sendKeys('test@example.com');

    // Find and fill in password
    const passwordInput = await driver.findElement(By.id('login-password'));
    await passwordInput.sendKeys('password123');

    // Submit the form
    const loginButton = await driver.findElement(By.css('.login-btn'));
    await loginButton.click();

    // Wait for redirect (e.g., to /profile)
    await driver.wait(until.urlContains('/profile'), 5000);

    // Assert: Confirm we are on the profile page
    const currentUrl = await driver.getCurrentUrl();
    if (currentUrl.includes('/profile')) {
      console.log('✅ Login test passed!');
    } else {
      console.error('❌ Login failed - did not redirect to profile.');
    }

  } catch (err) {
    console.error('❌ Error during login test:', err);
  } finally {
    await driver.quit(); // Always close browser
  }
})();
