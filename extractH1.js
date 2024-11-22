import axios from 'axios';
import * as cheerio from 'cheerio';
import fetchAndExtractUrls from './scrapXml.js'; // Ensure the file extension is included


// Function to fetch <h1> tags from a URL
async function fetchH1FromUrl(url) {
    try {
        const response = await axios.get(url); // Fetch the HTML content
        const html = response.data;
        const $ = cheerio.load(html); // Load the HTML into cheerio

        // Select the first <h1> tag and extract its text
        const h1Text = $('h1').first().text().trim();

        // Return the text if found, otherwise return a default message
        return h1Text || "";
    } catch (error) {
        console.error(`Error fetching ${url}:`, error.message);
        return "Error fetching page";
    }
}


async function fetchFirstContentFromUrl(url) {
    try {
        const response = await axios.get(url); // Fetch the HTML content
        const html = response.data;
        const $ = cheerio.load(html); // Load the HTML into cheerio

        // Select the first element with a class that starts with 'storyPage_storyContent'
        let firstContent = $('[class^="storyPage_storyContent"]').first().text().trim();

        if(!firstContent) {
            firstContent = $('[class^="contentSec"]').first().text().trim();
            
        }


        // Return the content if found, otherwise return a default message
        return firstContent;
    } catch (error) {
        console.error(`Error fetching ${url}:`, error.message);
        return "Error fetching page";
    }
}

// Process a list of URLs and fetch <h1> tags for each
async function processUrls(urls) {
    const allData = [];

    for (const url of urls) {
        // console.log(`Fetching <h1> tags from: ${url}`);
        const h1Tags = await fetchH1FromUrl(url); // Fetch h1 tags for the current URL
        const storyContent = await fetchFirstContentFromUrl(url)
        // console.log(`Found <h1> tags from ${url}:`, h1Tags);
        allData.push({heading: h1Tags, content: storyContent}); // Add the fetched h1 tags to the result array
    }

    return allData; // Return the complete array of h1 tags
}

// Example usage with your extracted links
const urls = [
    'https://example.com/page1',
    'https://example.com/page2'
]; // Replace with your links


const xmlUrl = 'https://www.livemint.com/sitemap/today.xml'; // Replace with your XML URL

function getH1(url) {
    return new Promise((resolve, reject) => {
        console.log("Starting");
        // fetchAndExtractUrls(xmlUrl)
        //     .then((urls) => {
        //         // const urls = ["https://www.livemint.com/politics/latest-politics-news-on-november-22-2024-live-updates-11732245593978.html"]
        //         console.log("🚀 ~ .then ~ urls:", urls?.[0])
        //         // console.log("🚀 ~ .then ~ urls:", urls)
        //         // const urls = ["https://www.livemint.com/mint-lounge/food/the-yard-siren-cocktail-bar-call-me-ten-amaru-11731404399570.html"]
        //        const h1s =  processUrls(urls);
        //         resolve(h1s); // Resolve with the extracted URLs or other desired data
        //     })
        //     .catch((error) => {
        //         console.error("Error:", error);
        //         reject(error); // Reject with the error
        //     });


        const h1s =  processUrls([url]);
        resolve(h1s); // Resolve with the extracted URLs or other desired data
    });
}

// Example usage
// start()
//     .then((urls) => {
//         console.log("Process completed successfully with URLs:", urls);
//     })
//     .catch((error) => {
//         console.error("Process failed:", error);
//     });


export default getH1;    