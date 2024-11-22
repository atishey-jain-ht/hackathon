import axios from 'axios';
import { parseStringPromise } from 'xml2js';

async function fetchAndExtractUrls(xmlUrl) {
  try {
    // Fetch the XML content from the URL
    const response = await axios.get(xmlUrl);
    const xmlData = response.data;

    // Parse the XML data
    const parsedData = await parseStringPromise(xmlData);

    // Extract URLs from <loc> tags in the XML
    const urls = [];
    if (parsedData.urlset && parsedData.urlset.url) {
      parsedData.urlset.url.forEach((entry) => {
        if (entry.loc && entry.loc[0]) {
          urls.push(entry.loc[0]);
        }
      });
    }

    return urls;
  } catch (error) {
    console.error("Error fetching or parsing XML:", error);
    return [];
  }
}

// Example usage
const xmlUrl = 'https://www.livemint.com/sitemap/today.xml'; // Replace with your XML URL
// fetchAndExtractUrls(xmlUrl)
//   .then((urls) => {
//     console.log("Extracted URLs:", urls);
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   });

export default fetchAndExtractUrls