const puppeteer = require('puppeteer');

(async() => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://www.zhentaoo.com', {waitUntil: 'networkidle'});

    await page.screenshot({path: './data/zhentaoo.png', type: 'png'});

    browser.close();
})();
