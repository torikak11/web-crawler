const { JSDOM } = require('jsdom')

function normalizeURL(url) {
    const urlObj = new URL(url);
    if (urlObj.pathname && urlObj.pathname.slice(-1) == '/') {
        return `${urlObj.hostname}${urlObj.pathname.slice(0, -1)}`
    } else {
        return `${urlObj.hostname}${urlObj.pathname}`
    }
}

function getURLsFromHTML(htmlBody, baseURL) {
    const urls = [];
    const dom = new JSDOM(htmlBody);
    const aElements =  dom.window.document.querySelectorAll('a');
    if (aElements.length === 0) {
        return urls
    } else {
        for (const aElement of aElements) {
            if (aElement.href.slice(0, 1) === '/') {
                try {
                    const urlObj = new URL(aElement.href, baseURL);
                    urls.push(urlObj.href);
                } catch (err) {
                    console.log(`error with relative url: ${err.message}`);
                }
            } else {
                try {
                    const urlObj = new URL(aElement.href);
                    urls.push(urlObj.href);
                } catch (err) {
                    console.log(`error with absolute url: ${err.message}`);
                }
            }
        }
        return urls
    }
}

async function crawlPage(baseURL, currentURL, pages) {
    const currentURLObj = new URL(currentURL);
    const baseURLObj = new URL(baseURL);
    if (currentURLObj.hostname !== baseURLObj.hostname) {
        return pages
    }

    const normalizedCurrentURL = normalizeURL(currentURL);
    if (pages[normalizedCurrentURL] > 0) {
        pages[normalizedCurrentURL] ++;
        return pages
    }

    pages[normalizedCurrentURL] = 1;
    console.log(`crawling over: ${currentURL}`);

    let htmlBody = '';
    try {
        const response = await fetch(currentURL);
        if (response.status > 399) {
            console.log(`error with status code: ${response.status} on page: ${currentURL}`);
            return pages
        }
        const contentType = response.headers.get("content-type");
        if (!contentType.includes("text/html")) {
            console.log("error in content-type");
            return pages
        }
        htmlBody = await response.text();
    } catch (err) {
        console.log(err.message);
    }
    const nextURLs = getURLsFromHTML(htmlBody, baseURL);
    for (const nextURL of nextURLs) {
        pages = await crawlPage(baseURL, nextURL, pages);
    }
    return pages
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}