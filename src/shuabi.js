const puppeteer = require('puppeteer');
var {timeout} = require('../tools/tools.js');

// var fxUrl = 'https://yeecall.gl.yeecall.com/activity/share/5a59a9d14cc2562b0fd32ec5'
// var meUrl = 'https://yeecall.gl.yeecall.com/activity/share/5a599e2664325570dd5b6c25'

var url1 = 'https://yeecall.gl.yeecall.com/activity/share?t=5a5a2507edea6a2010998444'
var url2 = 'https://yeecall.gl.yeecall.com/activity/share?t=5a5a24deebf2136b273c05ce'
var url3 = 'https://yeecall.gl.yeecall.com/activity/share?t=5a5a297debf2136b273c26ab'
var url4 = 'https://yeecall.gl.yeecall.com/activity/share?t=5a5a2986ebf2136b273c26f0'
var url5 = 'https://yeecall.gl.yeecall.com/activity/share?t=5a5a29add6ab05313934d7f6'
var url6 = 'https://yeecall.gl.yeecall.com/activity/share?t=5a5a29c4ebf2136b273c2851'
var url7 = 'https://yeecall.gl.yeecall.com/activity/share?t=5a5a2ec6edea6a201099cf70'
var url8 = 'https://yeecall.gl.yeecall.com/activity/share?t=5a5a2ecdd6ab0531393500ad'
var url9 = 'https://yeecall.gl.yeecall.com/activity/share?t=5a5a2edad6ab05313935010a'
var url10 = 'https://yeecall.gl.yeecall.com/activity/share?t=5a5a2ee2edea6a201099d040'

var token = [
  '0x1AA59c01fa169fB6A4a2E2D7DB9D02db9A9e',
  '0x1BD55G01fa169fkjA7a2E2D7SBG8R0dgy928',
  '0x1TG85G01faII2fkjA7a3G2DD76BG8D10dgyO',
  '0x1TON15GMUXaIO3BkjA7a3M8UD78YB8D1B3Gy',
  '0x100im57UNXaIa7bkjA7a3M8UD78YB8D1B3Gy',
  '0x5197fa565CED81cf5d599169e73754F0EDdC',
  '0xD3Da927d3698832fA68568152E43E9824b30',
  '0x743fFa1891640d0eA108d69362a287ea1063',
  '0x56B86E766860D8866B42e87B041BBa8065AE',
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
  var tookenRand = Math.floor( Math.random() * 9 )

  return token[tookenRand] + seed[rd1] + seed[rd2] + seed[rd3] + seed[rd4]
}
var count = 0
puppeteer.launch().then(async browser => {
// puppeteer.launch({headless: false}).then(async browser => {
    let p1 = await browser.newPage();
    let p2 = await browser.newPage();
    let p3 = await browser.newPage();
    let p4 = await browser.newPage();
    let p5 = await browser.newPage();
    let p6 = await browser.newPage();
    let p7 = await browser.newPage();
    let p8 = await browser.newPage();
    let p9 = await browser.newPage();
    let p10 = await browser.newPage();

    oneVisit(p1, url1)
    oneVisit(p2, url2)
    oneVisit(p3, url3)
    oneVisit(p4, url4)
    oneVisit(p5, url5)
    oneVisit(p6, url6)
    oneVisit(p7, url7)
    oneVisit(p8, url8)
    oneVisit(p9, url9)
    oneVisit(p10, url10)

    rdLoop()

    function rdLoop() {
      var time = Math.floor( Math.random() * 40 ) + 5
      console.log('time:', time);

      setTimeout(function () {
        oneVisit(p1, url1)
        oneVisit(p2, url2)
        oneVisit(p3, url3)
        oneVisit(p4, url4)
        oneVisit(p5, url5)
        oneVisit(p6, url6)
        oneVisit(p7, url7)
        oneVisit(p8, url8)
        oneVisit(p9, url9)
        oneVisit(p10, url10)

        console.log('time:', time);
        rdLoop()
      }, time * 1000);
    }

    async function oneVisit(page, url) {
      await page.goto(url);

      var input = await page.$('input')
      await input.click()
      await page.type(rdToken(), {delay: 20})
      await timeout(500);

      var submit = await page.$('button')
      await submit.click()
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
