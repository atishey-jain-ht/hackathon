import axios from 'axios';
import getH1 from './extractH1.js';
import generateImage from './dalle.js';
import Jsonic from 'jsonic';

// Define Azure OpenAI API details
const apiUrl = "https://hthackathon2024.openai.azure.com/openai/deployments/gpt-4o-mini/chat/completions?api-version=2024-02-15-preview";




// Function to send a prompt to Azure OpenAI
async function chatWithAzureGPT(input) {
  console.log("🚀 ~ chatWithAzureGPT ~ prompt:", input)

//   const prompt = 
//   `
//   As a content creator, Read the following story data and analyze its content to identify distinct parts or categories based on the narrative flow, context, or key themes. For each identified category i am trying to generate a summarized text for story under 30 words it should have property like
// 1. It should not use any emoji
// 2. It should be funny and engaging
// 3. should not have any spelling mistake
// 4. it should be funny and engaging
// 5. it should return an array of js object like [{category: "" , description:""}]. just return pure js objects
// 6. category should be like title should be more specific and informative
// 7. Please try to generate between 1 to 5 objects
// 8. The category should have name of person/compony/about which we were describing 
// 9. in output just return js array and nothing else. Don't add "javascript" in response
// 10. Don't return text like stay tuned for more updates, click to read more, etc.

// this is the heading of the article - ${input.heading}
// this is the content of the article -  ${input.content}
  // `

  const prompt = `
As a content creator i am trying to generate a heading and one line description for a web story under 30 words it should have property like
1. It should not use any emoji
3. should not have any spelling mistake
4. it should be funny and engaging
5. Return response should be like with no template string etc -  {category: "" , description:""}, For example {category: "India Election", description:"Indian election will held ..."}
6. The category should have name of person/compony/about which we were describing
7. category should be like title should be more specific and informative
8. It should return parsable js object so that we can pass that into function.
9.generate between 1 to 5 slides based on the content and categories them and return array

this is the heading of the article - ${input.heading}
this is the content of the article - ${input.content}

`;
  try {
    const response = await axios.post(
      apiUrl,
      {
        messages: [
            { role: "system", content: "You are a creative storyteller." },
            { role: "user", content: prompt },
        ],
        // max_tokens: 100, // Adjust as needed
        temperature: 0.7, // Adjust as needed
      },
      {
        headers: {
          "Content-Type": "application/json",
          "api-key": apiKey, // Azure-specific header
        },
      }
    );

    // Extract and log the assistant's reply
    const reply = response.data.choices[0].message.content;
    // let imgs = []
    //  for(let i=0;i<reply.length;i++) {
    //   const retImg = await generateImage(input)
    //   imgs.push(retImg)
    // }
    console.log("🚀 ~ chatWithAzureGPT ~ reply:", reply)
    // console.log("🚀 ~ chatWithAzureGPT ~ imgs:", imgs)

    const formattedReply = Jsonic(reply)
    console.log("🚀 ~ chatWithAzureGPT ~ formattedReply:", formattedReply)
   
    // const img = ""
    const img = await generateImage(input)
    console.log("🚀 ~ chatWithAzureGPT ~ img:", img)

    return {img, reply}
    // console.log("Assistant's Reply:", reply);
    // return reply
  } catch (error) {
    console.error("Error communicating with Azure OpenAI:", error.message);
    console.error("Details:", error.response?.data || error);
  }
}

// Example usage
// const prompt = "Tell me a fun fact about space.";
// chatWithAzureGPT(prompt);

// getH1().then(res => {
//     res?.slice(0,1)?.forEach((item) => {
//         console.log("🚀 ~ res?.slice ~ item:", item)
//         console.log("----- Starting generating-------")
//         chatWithAzureGPT(item);
//     })
// })


export function processH1(url) {
  return new Promise((resolve, reject) => {
    getH1(url)
      .then((res) => {
        // Handle the response
        const items = res?.slice(0, 1);
        if (!items || items.length === 0) {
          return resolve('No items to process.');
        }

        resolve(chatWithAzureGPT(items[0]))

        // items.forEach((item) => {
        //   console.log("🚀 ~ res?.slice ~ item:", item);
        //   console.log("----- Starting generating-------");
        //   chatWithAzureGPT(item);
        // });

        // resolve('Processing completed.');
      })
      .catch((error) => {
        // Handle errors
        reject(`An error occurred: ${error.message}`);
      });
  });
}

// Example usage:
// processH1()
//   .then((message) => console.log(message))
//   .catch((error) => console.error(error));
