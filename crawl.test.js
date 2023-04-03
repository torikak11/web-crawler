const { test, expect } = require('@jest/globals');
const { normalizeURL, getURLsFromHTML } = require('./crawl.js');

test('normalizeURL - strip https protocol with extra slash', () => {
    const input = 'https://test.dev/path/';
    const actual = normalizeURL(input);
    const expected = 'test.dev/path';
    expect(actual).toEqual(expected);
})

test('normalizeURL - strip http protocol', () => {
    const input = 'http://test.dev/path';
    const actual = normalizeURL(input);
    const expected = 'test.dev/path';
    expect(actual).toEqual(expected);
})

test('normalizeURL - strip https protocol with capital letter', () => {
    const input = 'https://test.Dev/path';
    const actual = normalizeURL(input);
    const expected = 'test.dev/path';
    expect(actual).toEqual(expected);
})

test('normalizeURL - strip https protocol', () => {
    const input = 'https://test.dev/path';
    const actual = normalizeURL(input);
    const expected = 'test.dev/path';
    expect(actual).toEqual(expected);
})

test('getURLsFromHTML - absolute urls', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="https://blog.boot.dev/"></a>
        </body>
    </html>
    `;
    const inputBaseURL = "https://blog.boot.dev/";
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = ["https://blog.boot.dev/"];
    expect(actual).toEqual(expected);
})

test('getURLsFromHTML - relative urls', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="/path/"></a>
        </body>
    </html>
    `;
    const inputBaseURL = "https://blog.boot.dev/";
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = ["https://blog.boot.dev/path/"];
    expect(actual).toEqual(expected);
})

test('getURLsFromHTML - multiple a tags', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="https://blog.boot.dev/"></a>
            <span>Interruption</span>
            <a href="/path/"></a>
            <p>Other Content</p>
            <a href="/other/path/"></a>
        </body>
    </html>
    `;
    const inputBaseURL = "https://blog.boot.dev/";
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = ["https://blog.boot.dev/", "https://blog.boot.dev/path/", "https://blog.boot.dev/other/path/"];
    expect(actual).toEqual(expected);
})

test('getURLsFromHTML - invalid url', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="invalid"></a>
        </body>
    </html>
    `;
    const inputBaseURL = "https://blog.boot.dev/";
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = [];
    expect(actual).toEqual(expected);
})

test('getURLsFromHTML - no urls', () => {
    const inputHTMLBody = `
    <html>
        <body>
        </body>
    </html>
    `;
    const inputBaseURL = "https://blog.boot.dev/";
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = [];
    expect(actual).toEqual(expected);
})