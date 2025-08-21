const { chromium } = require('playwright');

async function testCustomYellow() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    console.log('Testing custom yellow color #F1D64A...');
    
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    await page.screenshot({ path: 'custom-yellow-test.png', fullPage: true });
    console.log('Screenshot saved as custom-yellow-test.png');
    
    // Wait to see the page
    await page.waitForTimeout(3000);
    
    console.log('Custom yellow color test complete!');
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
}

testCustomYellow();



