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

// puppeteer.launch().then(async browser => {
puppeteer.launch({headless: false}).then(async browser => {
    // let page = await browser.newPage();
    // page.setViewport({width: 1200, height: 600})
    // await page.goto('http://www.zhentaoo.com');

    let page2 = await browser.newPage()

    page2.setViewport({width: 1200, height: 600})

    await page2.goto('https://github.com/zt-npm');

    await timeout(2000)

    await page2.evaluate(async () => {
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


      // login
      var login = await document.querySelector('.header-navlink > a')

      console.log('login:', login);

      login.click()

      await timeout(1000)

      var signName = document.querySelector('.form-control, .input-block')
      console.log('signName:', signName);

      // var btn = document.querySelector('.TableObject-item > .btn,.btn-primary')
      // console.log(btn);
      // btn.click()
    })

    // await page.goto('https://melody-test.faas.elenet.me/app/chain-shop/dashboard');
    // await timeout(2000);

    // await page.pdf({path: './data/melody.png'});

    // page.close()

    // browser.close();
});
