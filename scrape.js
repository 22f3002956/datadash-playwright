const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // put the real 10 URLs here
  const urls = [
  'https://sanand0.github.io/tdsdata/js_table/?seed=81',
  'https://sanand0.github.io/tdsdata/js_table/?seed=82',
  'https://sanand0.github.io/tdsdata/js_table/?seed=83',
  'https://sanand0.github.io/tdsdata/js_table/?seed=84',
  'https://sanand0.github.io/tdsdata/js_table/?seed=85',
  'https://sanand0.github.io/tdsdata/js_table/?seed=86',
  'https://sanand0.github.io/tdsdata/js_table/?seed=87',
  'https://sanand0.github.io/tdsdata/js_table/?seed=88',
  'https://sanand0.github.io/tdsdata/js_table/?seed=89',
  'https://sanand0.github.io/tdsdata/js_table/?seed=90',
  ];

  let grandTotal = 0;

  for (const url of urls) {
    console.log("Visiting:", url);
    await page.goto(url, { waitUntil: 'networkidle' });

    // select all table cells
    const cells = await page.$$eval("table td, table th", nodes =>
      nodes.map(n => n.innerText.trim())
    );

    for (const cell of cells) {
      // get numbers only
      const clean = cell.replace(/,/g, '');
      if (!isNaN(clean) && clean !== "") {
        grandTotal += Number(clean);
      }
    }
  }

  console.log("TOTAL:", grandTotal);
  await browser.close();
})();
