const puppeteer = require('puppeteer')
var {timeout} = require('../tools/tools.js');

// 以下拿掘金开刀,贡献私人测试账号
// puppeteer.launch().then(async browser => {
puppeteer.launch({headless: false}).then(async browser => {
    var page = await browser.newPage()
    page.setViewport({width: 1200, height: 600})

    /** 1. 到sf获取最新的前端文章 **/
    try {
        await page.goto('https://segmentfault.com/news/frontend')
        await timeout(1000)

        var SfFeArticleList = await page.evaluate(() => {
            var list = [...document.querySelectorAll('.news__list .news__item-title a')]

            return list.map(el => {
                return {href: el.href.trim(), title: el.innerText}
            })
        })

        console.log('SfFeArticleList:', SfFeArticleList);

        await page.screenshot({path: './data/sf-juejin/sf.png', type: 'png'});
    } catch (e) {
        console.log('sf err:', e);
    }

    /** 登录juejin **/
    try {
        await timeout(1000)
        await page.goto('https://juejin.im')
        await timeout(1000)

        var login = await page.$('.login')
        await login.click()

        var loginPhoneOrEmail = await page.$('[name=loginPhoneOrEmail]')
        console.log('loginPhoneOrEmail:', loginPhoneOrEmail);
        await loginPhoneOrEmail.click()
        await page.type('18516697699@163.com', {delay: 20})

        var password = await page.$('[placeholder=请输入密码]')
        console.log('password:', password);
        await password.click()
        await page.type('123456', {delay: 20})

        var authLogin = await page.$('.panel .btn')
        console.log('authLogin:', authLogin);
        await authLogin.click()

    } catch (e) {}

    /** 随机推荐一篇从sf拿来的文章到掘金 **/
    try {
        await timeout(2500)
        var seed = Math.floor(Math.random() * 30)
        var theArtile = SfFeArticleList[seed]

        var add = await page.$('.main-nav .ion-android-add')
        await add.click()
        await timeout(2500)

        var shareUrl = await page.$('.entry-form-input .url-input')
        await shareUrl.click()
        await page.type(theArtile.href, {delay: 20})

        await page.press('Tab')
        await page.type(theArtile.title, {delay: 20})

        await page.press('Tab')
        await page.type(theArtile.title, {delay: 20})

        await page.evaluate(() => {
            let li = [...document.querySelectorAll('.category-list-box .category-list .item')]
            li.forEach(el => {
                if (el.innerText == '前端')
                    el.click()
            })
        })

        var submitBtn = await page.$('.submit-btn')
        await submitBtn.click()

    } catch (e) {
        await page.screenshot({path: './data/sf-juejin/err.png', type: 'png'});
    }

    await page.screenshot({path: './data/sf-juejin/done.png', type: 'png'});
    // await page.close()
    // browser.close()
})
