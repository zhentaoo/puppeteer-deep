## Puppeteer

### All API
https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#puppeteerlaunchoptions

### Introduce
Puppeteer是一个node包，他提供了一些用来控制Chrome的高级API。类似于PhantomJS，Puppeteer提供一个浏览器环境的命令行接口，可以把它当成“虚拟浏览器”。不同于Phantom，Puppeteer是Chrome官方团队进行维护的，前景更好。在这个repo中，主要先介绍Puppeteer，具体的应用场景日后发掘完善....

### Key Feature
1. 用网页生成的PDF文件
2. 爬取 SPA应用 并生成预渲染内容（即“SSR”）
3. 从网站抓取内容
4. 自动化表单提交、UI测试、键盘输入等。
5. 创建一个最新的自动化测试环境。直接在
6. 使用最新的JavaScript和最新版本Chrome。
7. 捕获站点的时间线跟踪，以帮助诊断性能问题。

### Example, Usage
1. node version > 7.1
2. npm install
3. npm start
4. 可以看到运行之后，把 'www.zhentaoo.com' 首页以pdf的形式保存下来了
5. 还有很多其他功能，可以陆续添加进来
