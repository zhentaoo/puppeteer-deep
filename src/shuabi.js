const puppeteer = require('puppeteer');
var {timeout} = require('../tools/tools.js');

var fxUrl = 'https://yeecall.gl.yeecall.com/activity/share/5a59a9d14cc2562b0fd32ec5'
var meUrl = 'https://yeecall.gl.yeecall.com/activity/share/5a599e2664325570dd5b6c25'
var token = [
  '0x1AA59c01fa169fB6A4a2E2D7DB9D02db9A9e',
  '0x1BD55G01fa169fkjA7a2E2D7SBG8R0dgy928',
  '0x1TG85G01faII2fkjA7a3G2DD76BG8D10dgyO',
  '0x1TON15GMUXaIO3BkjA7a3M8UD78YB8D1B3Gy',
  '0x100im57UNXaIa7bkjA7a3M8UD78YB8D1B3Gy'
]

function rdToken() {
  var seed = [
    1,2,3,4,5,6,7,8,9,0,
    'a','b','c','d','e','f','g',
    'h','i','j','k','l','m','n',
    'o','p','q','r','s','t',
    'u','v','w','x','y','z',
    'A','B','C','D','E','F','G',
    'H','I','J','K','L','M','N',
    'O','P','Q','R','S','T',
    'U','V','W','X','Y','Z',
  ]
  var rd1 = Math.floor( Math.random() * 62 )
  var rd2 = Math.floor( Math.random() * 62 )
  var rd3 = Math.floor( Math.random() * 62 )
  var rd4 = Math.floor( Math.random() * 62 )
  var tookenRand = Math.floor( Math.random() * 5 )

  return token[tookenRand] + seed[rd1] + seed[rd2] + seed[rd3] + seed[rd4]
}
var count = 0
// puppeteer.launch().then(async browser => {
puppeteer.launch({headless: false}).then(async browser => {
    let p = await browser.newPage();
    let p1 = await browser.newPage();

    loop(p1, fxUrl)
    loop(p, meUrl)
    var sid = setInterval(() => {
      loop(p1, fxUrl)
      loop(p, meUrl)
    }, 1000 * 6);

    async function loop(page, url) {
      await page.goto(url);

      var input = await page.$('input')
      await input.click()
      await page.type(rdToken(), {delay: 20})
      await timeout(500);

      var submit = await page.$('button')
      await submit.click()
      console.log('success:', count);
      count ++
      await timeout(500);

      var ICO_TOKEN = await page.evaluate(() => {
        if (localStorage.ICO_TOKEN) {
          delete localStorage.ICO_TOKEN
          location.reload()
        }
        return localStorage.ICO_TOKEN
      })
    }
});
