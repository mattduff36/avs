const { chromium } = require('playwright');

async function verifyColors() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    console.log('=== VERIFYING COLOR CHANGES ===');
    
    // Check homepage
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    console.log('✓ Homepage loaded');
    
    // Check for yellow elements (should find many)
    const yellowElements = await page.evaluate(() => {
      const elements = Array.from(document.querySelectorAll('*'));
      return elements.filter(el => {
        const classes = el.className;
        return classes.includes('bg-yellow') || 
               classes.includes('text-yellow') || 
               classes.includes('border-yellow') ||
               classes.includes('hover:bg-yellow') ||
               classes.includes('hover:text-yellow');
      }).length;
    });
    
    console.log(✓ Found  elements with yellow classes);
    
    // Check for orange elements (should find none)
    const orangeElements = await page.evaluate(() => {
      const elements = Array.from(document.querySelectorAll('*'));
      return elements.filter(el => {
        const classes = el.className;
        return classes.includes('bg-orange') || 
               classes.includes('text-orange') || 
               classes.includes('border-orange') ||
               classes.includes('hover:bg-orange') ||
               classes.includes('hover:text-orange');
      }).length;
    });
    
    console.log(✓ Found  elements with orange classes (should be 0));
    
    if (orangeElements === 0 && yellowElements > 0) {
      console.log('🎉 SUCCESS: All orange colors have been changed to yellow!');
    } else {
      console.log('⚠️  WARNING: Some orange colors may still exist');
    }
    
    // Take a screenshot of the hero section
    await page.screenshot({ path: 'color-verification.png' });
    console.log('✓ Screenshot saved as color-verification.png');
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
}

verifyColors();
