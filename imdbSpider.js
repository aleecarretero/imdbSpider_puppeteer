const puppeteer = require('puppeteer');

(async () => {
    // define a URL to be parsed
    let movieUrl = 'https://www.imdb.com/title/tt0111161/?ref_=nv_sr_1';

    // initialize puppeteer's browser and open a new page in it
    let browser = await puppeteer.launch();
    let page = await browser.newPage();

    //  go to URL
    await page.goto(movieUrl, { waitUntil: 'networkidle2' });

    // queries and stores information in "data"
    let data = await page.evaluate(() => {
        let title = document.querySelector('div[class="title_wrapper"] > h1').innerText;
        let rating = document.querySelector('span[itemprop="ratingValue"]').innerText;
        let ratingCount = document.querySelector('span[itemprop="ratingCount"]').innerText;

        return {
            title,
            rating,
            ratingCount
        };
    });

    // display information
    console.log(data);

    // close browser
    await browser.close();
})();
