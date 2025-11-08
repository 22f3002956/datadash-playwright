const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // put the real 10 URLs here
  const urls = [
    "https://example.com/seed81",
    "https://example.com/seed82",
    "https://example.com/seed83",
    "https://example.com/seed84",
    "https://example.com/seed85",
    "https://example.com/seed86",
    "https://example.com/seed87",
    "https://example.com/seed88",
    "https://example.com/seed89",
    "https://example.com/seed90",
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
