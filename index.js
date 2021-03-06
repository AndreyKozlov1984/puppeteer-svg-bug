const puppeteer = require('puppeteer');
const path = require('path');

const getPng = (async () => {
  const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
  const page = await browser.newPage();
  await page.goto(`file://${path.resolve(__dirname, 'min.svg')}`);
  const png = await page.screenshot({omitBackground: true, encoding: 'base64' });
  await browser.close();
  return png;
});

async function main() {
    const result = [];
    for (var i = 0; i < 30; i ++) {
        const png = await getPng();
        if (result.indexOf(png) === -1) {
            result.push(png);
        }
    }
    // output: [ 64760, 64744 ]
    // expected output: an array with a single element
    console.info(result.map( (x) => x.length));

}
main().catch(console.info);
