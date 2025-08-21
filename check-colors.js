const { chromium } = require('playwright');

async function checkColors() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    console.log('Checking homepage...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    await page.screenshot({ path: 'homepage-before.png', fullPage: true });
    
    // Check for orange elements
    const orangeElements = await page.$$eval('*', elements => {
      return elements.filter(el => {
        const style = window.getComputedStyle(el);
        const bgColor = style.backgroundColor;
        const color = style.color;
        const borderColor = style.borderColor;
        
        return bgColor.includes('234, 88, 12') || // orange-600
               bgColor.includes('194, 65, 12') || // orange-700
               color.includes('234, 88, 12') ||
               color.includes('194, 65, 12') ||
               borderColor.includes('234, 88, 12') ||
               borderColor.includes('194, 65, 12');
      }).length;
    });
    
    console.log(`Found ${orangeElements} elements with orange colors on homepage`);
    
    // Check other pages
    const pages = ['/about', '/services', '/contact', '/projects', '/machines', '/news'];
    
    for (const pagePath of pages) {
      console.log(`Checking ${pagePath}...`);
      await page.goto(`http://localhost:3000${pagePath}`, { waitUntil: 'networkidle' });
      await page.screenshot({ path: `${pagePath.replace('/', '')}-before.png`, fullPage: true });
      
      const pageOrangeElements = await page.$$eval('*', elements => {
        return elements.filter(el => {
          const style = window.getComputedStyle(el);
          const bgColor = style.backgroundColor;
          const color = style.color;
          const borderColor = style.borderColor;
          
          return bgColor.includes('234, 88, 12') || // orange-600
                 bgColor.includes('194, 65, 12') || // orange-700
                 color.includes('234, 88, 12') ||
                 color.includes('194, 65, 12') ||
                 borderColor.includes('234, 88, 12') ||
                 borderColor.includes('194, 65, 12');
        }).length;
      });
      
      console.log(`Found ${pageOrangeElements} elements with orange colors on ${pagePath}`);
    }
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
}

checkColors();


