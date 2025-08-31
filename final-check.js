const { chromium } = require('playwright');

async function finalCheck() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    console.log('FINAL COLOR VERIFICATION...');
    
    // Homepage
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    await page.screenshot({ path: 'homepage-final.png', fullPage: true });
    console.log('Homepage screenshot taken');
    
    // Services page  
    await page.goto('http://localhost:3000/services', { waitUntil: 'networkidle' });
    await page.screenshot({ path: 'services-final.png', fullPage: true });
    console.log('Services screenshot taken');
    
    // About page
    await page.goto('http://localhost:3000/about', { waitUntil: 'networkidle' });
    await page.screenshot({ path: 'about-final.png', fullPage: true });
    console.log('About screenshot taken');
    
    // Contact page
    await page.goto('http://localhost:3000/contact', { waitUntil: 'networkidle' });
    await page.screenshot({ path: 'contact-final.png', fullPage: true });
    console.log('Contact screenshot taken');
    
    console.log('ALL SCREENSHOTS COMPLETE - Check for yellow colors!');
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
}

finalCheck();
















