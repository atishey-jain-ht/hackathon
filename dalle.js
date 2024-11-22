import OpenAI from "openai";



const openai = new OpenAI({
   });

async function generateImage(input) {
console.log("🚀 ~ generateImage ~ input:", input)

    const prompt = `
    As a content creator i am trying to generate an image based on text for story. it should have property like :
1. It should not use any word, and sentence
2. It should be usable in a web story
3. Please make sure spelling is correct
4. should use visually enriching
5. It should look like natural photographed photo not computer generated
6. It should not use any wrong flag or name.
7. It should not be very random image. It should be related to the content and heading, should also match emotions.

this is the heading of the article - ${input.heading}
this is the content of the article - ${input.content?.substring(0, 600)}

    `

    // const prompt = `
    // generate a meme image : A funny cartoon inspired by the summary and please make sure spelling on image is correct: "${input}"`;

    try {
        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt,
            n: 1,
            size: "1024x1024",
            quality: "standard",
        });

        const imageUrl = response.data[0].url;  // Get the URL of the generated image
        console.log('Generated Image URL:', imageUrl);
        return imageUrl;  // Return the image URL or use it further
    } catch (error) {
        console.error("Error generating image:", error.response ? error.response.data : error.message);
        throw error;
    }
}

// Example usage
// const prompt = "A futuristic city with flying cars and neon lights";
// generateImage(prompt)
//     .then((imageUrl) => {
//         console.log('Image URL:', imageUrl);  // You can use this URL to display or download the image
//     })
//     .catch((error) => {
//         console.error("Error:", error);
//     });

export default generateImage    