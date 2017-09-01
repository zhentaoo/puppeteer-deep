## 首先介绍Puppeteer
- Puppeteer是一个node库，他提供了一组用来操纵Chrome的API，理论上使用它可以做任何Chrome可以做的事
- 有点类似于PhantomJS，但Puppeteer由Chrome官方团队进行维护，前景更好
- Puppeteer的应用场景会非常多，就爬虫领域来说，远比一般的爬虫工具功能更丰富，性能分析、自动化测试也不在话下，今天先探讨爬虫相关
- [Puppeteer官方文档请猛戳这里](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#puppeteerlaunchoptions)

## 项目Repo && 运行
1. git clone https://github.com/zhentaoo/puppeteer-deep
2. npm install (puppeteer在win下100+M、mac下70+M，请耐心等候)
3. npm test

## 简要提下Puppeteer的应用场景
1. 屏幕快照，打印PDF
2. 高级爬虫（有别于传统爬虫.使用Puppeteer可以拿到渲染后的效果，传统爬虫相当于只能拿到http response）
3. UI自动化测试（使用Puppeteer可以模拟用户操作）
4. 页面性能分析

## 废话不多说，直接上动图/视频看效果
GIF图片比较大，如果不能加载成功，也可以到微博看下录制的视频
http://weibo.com/tv/v/FiHMz7dcq?fid=1034:dcc08a8eee118263f6071fb6fafcc9a9

<img src="https://raw.githubusercontent.com/zhentaoo/puppeteer-deep/master/doc/sf-jj.gif" width = "700" height = "440" align=center />

## 下面就来介绍具体流程

### 1. 爬取 segmentfault 前30篇热门文章
  - 跳转到https://segmentfault.com/news/frontend
  - 接着分析SF首页的Dom结构，爬取每篇文章的链接
  - 然后取出每篇文章最重要的 href，title 等信息
  - 具体代码如下：
  ```js
      await page.goto('https://segmentfault.com/news/frontend')

      var SfFeArticleList = await page.evaluate(() => {
          var list = [...document.querySelectorAll('.news__list .news__item-title a')]
          return list.map(el => {
              return {href: el.href.trim(), title: el.innerText}
          })
      })

      await page.screenshot({path: './sf-juejin/sf.png', type: 'png'});
  ```

### 2. 登录掘金 (这里我事先注册了个测试账号,大家可以替换成自己的)
- 跳转到掘金，模拟点击登录按钮
- 接着，会弹出一个的登录dialog，模拟输入用户名密码
- 模拟点击登录，稍等....嗯...掘金应该把cookie写好了....
- 代码如下：
```js
      await page.goto('https://juejin.im')

      var login = await page.$('.login')
      await login.click()

      var loginPhoneOrEmail = await page.$('[name=loginPhoneOrEmail]')
      await loginPhoneOrEmail.click()
      await page.type('18516697699@163.com', {delay: 20})

      var password = await page.$('[placeholder=请输入密码]')
      await password.click()
      await page.type('123456', {delay: 20})

      var authLogin = await page.$('.panel .btn')
      await authLogin.click()
```
### 3.推荐文章（使用第一步从SF爬取的文章信息）
- 模拟点击推荐文章 按钮 “＋”
- 这时从SF拿到的文章信息就派上用场了，随机取出一篇: Math.floor(Math.random() * 30)
- 模拟填写推荐表单，点击发布
- 嗯，有时会提示该文章已被分享，那就换一篇吧，再执行一次。
- 代码如下
```js
      var seed = Math.floor(Math.random() * 30)
      var theArtile = SfFeArticleList[seed]

      var add = await page.$('.main-nav .ion-android-add')
      await add.click()

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
```

## 结语
1. 为了效果展示，这里使用的headless: false模式，实际使用时可以同时开n个page，模拟操作，大家可以尝试改改，也可以给我提PR
2. 目前已经带领大家，使用Puppeteer完成爬虫 和 UI自动化测试，接下来可能会出第三篇，应该会是关于前端性能分析
3. 其实Puppeteer的应用场景远不止这些，大家也可以使用它在各自的领域大放异彩！！！
4. 希望掘金小编不会打我....




<!-- ## Puppeteer-Deep (Node: v8.4.0)

#### API
https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#puppeteerlaunchoptions

#### Introduce
Puppeteer是一个node包，他提供了用来控制Chrome的高级API，有点类似于PhantomJS。不同于Phantom，Puppeteer是Chrome官方团队进行维护的，前景更好。在这个repo中，主要先介绍Puppeteer，具体的应用场景不断发掘

#### Puppeteer Key Feature
1. 用网页生成的PDF文件
2. 爬取 SPA应用 并生成预渲染内容（即“SSR”）
3. 从网站抓取内容
4. 自动化表单提交、UI测试、键盘输入等。
5. 创建一个最新的自动化测试环境。直接在
6. 使用最新的JavaScript和最新版本Chrome。
7. 捕获站点的时间线跟踪，以帮助诊断性能问题。

## Scene
1. UI-Test: UI自动化测试--拿掘金开刀，把sf的文章自动搬运到jj，这里为了方便录制使用headless false模式，下面是一张完整效果的动图，20M显示比较慢，请耐心等下
![](./doc/sf-jj.gif)

2. Crawler（爬取阮老师的es6, 具体流程可以看代码，下面提几个关键点）
`npm run es6`: 执行之后，会在es6-pdf下生成阮老师的es6文章的pdf版本
![](./doc/es6.png)

3. Performance (性能分析, 待完成....) -->
