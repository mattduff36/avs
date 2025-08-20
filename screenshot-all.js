const { chromium } = require('playwright');

async function screenshotAll() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  const pages = [
    { path: '/', name: 'homepage' },
    { path: '/about', name: 'about' },
    { path: '/services', name: 'services' },
    { path: '/contact', name: 'contact' },
    { path: '/projects', name: 'projects' },
    { path: '/machines', name: 'machines' },
    { path: '/news', name: 'news' }
  ];
  
  for (const pageInfo of pages) {
    try {
      console.log(Capturing ...);
      await page.goto(http://localhost:3000, { waitUntil: 'networkidle' });
      await page.screenshot({ path: ${pageInfo.name}-yellow.png, fullPage: true });
      console.log(✓ Saved -yellow.png);
    } catch (error) {
      console.error(Error capturing :, error.message);
    }
  }
  
  await browser.close();
  console.log('All screenshots completed!');
}

screenshotAll();
