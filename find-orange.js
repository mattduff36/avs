const { chromium } = require('playwright');

async function findOrangeColors() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    console.log('🔍 SCANNING FOR ORANGE COLORS...');
    
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    console.log('✓ Homepage loaded');
    
    // Take a screenshot first
    await page.screenshot({ path: 'current-site.png', fullPage: true });
    
    // Find all elements with orange colors (RGB values for orange)
    const orangeElements = await page.evaluate(() => {
      const elements = Array.from(document.querySelectorAll('*'));
      const orangeFound = [];
      
      elements.forEach((el, index) => {
        const style = window.getComputedStyle(el);
        const bgColor = style.backgroundColor;
        const textColor = style.color;
        const borderColor = style.borderColor;
        
        // Check for orange RGB values
        // orange-600: rgb(234, 88, 12)
        // orange-700: rgb(194, 65, 12) 
        // orange-500: rgb(249, 115, 22)
        if (
          bgColor.includes('234, 88, 12') || bgColor.includes('194, 65, 12') || bgColor.includes('249, 115, 22') ||
          textColor.includes('234, 88, 12') || textColor.includes('194, 65, 12') || textColor.includes('249, 115, 22') ||
          borderColor.includes('234, 88, 12') || borderColor.includes('194, 65, 12') || borderColor.includes('249, 115, 22')
        ) {
          orangeFound.push({
            index,
            tagName: el.tagName,
            className: el.className,
            id: el.id,
            bgColor,
            textColor,
            borderColor,
            textContent: el.textContent?.substring(0, 50) + '...'
          });
        }
      });
      
      return orangeFound;
    });
    
    console.log(🚨 FOUND  ELEMENTS WITH ORANGE COLORS:);
    orangeElements.forEach((el, i) => {
      console.log(${i + 1}.  - Class: "" - BG:  - Text: );
    });
    
    // Also check for Tailwind orange classes that might still exist
    const tailwindOrange = await page.evaluate(() => {
      const elements = Array.from(document.querySelectorAll('*'));
      return elements.filter(el => {
        const classes = el.className || '';
        return classes.match(/bg-orange|text-orange|border-orange|hover:.*orange/);
      }).map(el => ({
        tagName: el.tagName,
        className: el.className,
        textContent: el.textContent?.substring(0, 30)
      }));
    });
    
    console.log(🎨 FOUND  ELEMENTS WITH ORANGE TAILWIND CLASSES:);
    tailwindOrange.forEach((el, i) => {
      console.log(${i + 1}.  - "");
    });
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
}

findOrangeColors();
