const puppeteer = require('puppeteer');

let timeout = function(delay) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                resolve(1)
            } catch (e) {
                reject(0)
            }
        }, delay)
    })
}

puppeteer.launch().then(async browser => {
    let page = await browser.newPage();

    await page.goto('http://es6.ruanyifeng.com/#docs/regex');

    await timeout(2000);

    let arr = await page.$("ol li a");

    let aTags = await page.evaluate(() => {
      let as = [...document.querySelectorAll('ol li a')];
      return as.map((a) => a.href.trim());
    });

    console.log(aTags);

    await page.pdf({path: './es6-pdf/screenshot.pdf'});

    browser.close();
});
