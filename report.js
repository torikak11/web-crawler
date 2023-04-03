function printReport(pages) {
    const sortedPages = sortPages(pages);
    console.log('###############################');
    console.log('####### Starting Report #######');
    console.log('###############################');
    for (const page of sortedPages) {
        const hits = page[1];
        const url = page[0];
        console.log((hits > 1 ? `Found ${hits} internal links to ${url}` : `Found ${hits} internal link to ${url}`));
    }
    console.log('#############################');
    console.log('####### End of Report #######');
    console.log('#############################');
}

function sortPages(pages) {
    const pagesArr = Object.entries(pages);
    pagesArr.sort((a, b) => {
        aHits = a[1];
        bHits = b[1];
        return b[1] - a[1];
    })
    return pagesArr
}

module.exports = {
    printReport,
    sortPages
}