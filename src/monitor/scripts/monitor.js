const puppeteer = require('puppeteer');
let {timeout, moment} = require('../../../tools/tools.js');
let rp = require('request-promise');

function monitor() {
    puppeteer.launch().then(async browser => {
        let page = await browser.newPage();
        let date = moment("Y-M-DTh:m:s");

        // 进入网站后，等待三秒
        await page.goto('http://www.zhentaoo.com/');
        await timeout(3000);

        // 取出首页的文章title，如果有title为空，则截图存入err，mongo，结束本次任务
        let info = await page.evaluate(() => {
            let post = [...document.querySelectorAll('.post-title')];
            return post.map((a) => a.innerText );
        });

        for (let i = 0; i < info.length; i++) {
          if (!info[i]) {
            let options = {
                uri: 'http://127.0.0.1:3000/monitor',
                qs: {
                    img: `ZT-${date}.png`
                }
            };

            rq(options);
            await page.screenshot({path: `./data/monitor/err/ZT-${date}.png`, type: 'png'});
            browser.close();
          }
        }

        // 如果正常则截图，结束任务
        await page.screenshot({path: `./data/monitor/success/ZT-${date}.png`, type: 'png'});
        browser.close();
    });
}

monitor();
setInterval(monitor, 1000 * 60 * 5);
