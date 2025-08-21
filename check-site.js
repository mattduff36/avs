const { chromium } = require('playwright');

async function checkSite() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    console.log('Navigating to http://localhost:3000...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    
    // Take a screenshot
    await page.screenshot({ path: 'homepage-screenshot.png', fullPage: true });
    console.log('Screenshot saved as homepage-screenshot.png');
    
    // Get the page title
    const title = await page.title();
    console.log('Page title:', title);
    
    // Check if our components are present
    const heroSection = await page.locator('section').first().textContent();
    console.log('First section content:', heroSection.substring(0, 200) + '...');
    
    // Check for A&V Squires content
    const hasAVSquires = await page.locator('text=A&V Squires').count();
    console.log('A&V Squires mentions found:', hasAVSquires);
    
    // Check for Next.js default content
    const hasNextJSDefault = await page.locator('text=Get started by editing').count();
    console.log('Next.js default content found:', hasNextJSDefault);
    
    await page.waitForTimeout(3000);
    
  } catch (error) {
    console.error('Error checking site:', error);
  } finally {
    await browser.close();
  }
}

checkSite();

