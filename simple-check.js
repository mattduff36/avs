const { chromium } = require('playwright');

async function checkSite() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    console.log('Loading homepage...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    
    await page.screenshot({ path: 'site-check.png', fullPage: true });
    console.log('Screenshot saved');
    
    // Wait for 5 seconds to see the page
    await page.waitForTimeout(5000);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
}

checkSite();
















