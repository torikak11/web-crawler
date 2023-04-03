const { test, expect } = require('@jest/globals');
const { sortPages } = require('./report.js');

test('sortPages - 4 pages', () => {
    const input = {
        'wagslane.dev/tags/writing': 1 ,
        'wagslane.dev/posts/seo-is-a-scam-job': 2,
        'wagslane.dev/posts/collapsing-quality-of-devto': 2,
        'wagslane.dev/posts/developers-learn-to-say-no': 1
    };
    const actual = sortPages(input);
    const expected = [
        ['wagslane.dev/posts/seo-is-a-scam-job', 2],
        ['wagslane.dev/posts/collapsing-quality-of-devto', 2],
        ['wagslane.dev/tags/writing', 1],
        ['wagslane.dev/posts/developers-learn-to-say-no', 1]
    ];
    expect(actual).toEqual(expected);
})