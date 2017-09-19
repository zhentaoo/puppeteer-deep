const puppeteer = require('puppeteer');
var {timeout, moment} = require('../../../tools/tools.js');

function monitor() {
  puppeteer.launch().then(async browser => {
      let page = await browser.newPage();

      await page.goto('http://www.zhentaoo.com/');
      await timeout(2000);

      let aTags = await page.evaluate(() => {
        let as = [...document.querySelectorAll('ol li a')];
        return as.map((a) =>{
            return {
              href: a.href.trim(),
              name: a.text
            }
        });
      });
      
      var date = Math.random();
      await page.screenshot({path: `./data/monitor/zhentaoo-${date}.png`, type: 'png'});
      browser.close();
  });
}

monitor();
setInterval(monitor, 1000 * 60 * 5);
