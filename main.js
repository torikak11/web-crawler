const { crawlPage } = require("./crawl.js");

async function main() {
    // Check for valid amount of comman line arguments
    if (process.argv.length < 3 || process.argv.length > 3) {
        console.log("Invalid number of arguments: Program requires 1 base URL");
    } else {
        console.log(`Web crawler has started at ${process.argv[2]}`);
    }
    const pages = await crawlPage(process.argv[2], process.argv[2], {});

    for (const page of Object.entries(pages)) {
        console.log(page);
    }
}

main()