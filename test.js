const puppeteer = require('puppeteer');

async function test () {
  const browser = await puppeteer.launch({headless: false});
  // const browser = await puppeteer.launch({executablePath: '/path/to/Chrome'});
}

test()
