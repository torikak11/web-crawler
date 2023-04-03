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
                    const urlObj = new URL(baseURL + aElement.href.slice(1));
                    urls.push(urlObj.href);
                } catch (err) {
                    console.log(`error with relative url: ${err.message}`);
                }
            } else {
                try {
                    const urlObj = new URL(aElement.href);
                    urls.push(aElement.href);
                } catch (err) {
                    console.log(`error with absolute url: ${err.message}`);
                }
            }
        }
        return urls
    }
}

async function crawlPage(baseURL, currentURL, pages) {
    try {
        const response = await fetch(currentURL);
        if (response.status > 399) {
            console.log(`error with status code: ${response.status} on page: ${currentURL}`);
            return
        }
        const contentType = response.headers.get("content-type");
        if (!contentType.includes("text/html")) {
            console.log("error in content-type");
            return
        }
        console.log(await response.text())
    } catch (err) {
        console.log(err.message);
        return
    }
    const currentURLObj = new URL(currentURL);
    const baseURLObj = new URL(baseURL);
    if (currentURLObj.hostname !== baseURLObj.hostname) {
        return pages
    }
    const normalizedCurrentURL = normalizeURL(currentURL);
    if (normalizedCurrentURL in pages) {
        
    }
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}