const fetch = require('node-fetch');
const { JSDOM } = require('jsdom');
const cheerio = require('cheerio');


async function extractKeyContent(url) {
    try {
        const response = await fetch(url);
        const html = await response.text();
        const $ = cheerio.load(html);

        // Extract key content by selecting specific elements
        const keyContent = $('p').text();  // Example: Extracting text from all paragraphs

        // Check word count and trim if necessary
        const wordCount = keyContent.split(/\s+/).length;
        const maxWordCount = 50;

        if (wordCount > maxWordCount) {
            // Trim the content to the first maxWordCount words
            const words = keyContent.split(/\s+/);
            const trimmedContent = words.slice(0, maxWordCount).join(' ');
            return trimmedContent;
        }

        return keyContent;
    } catch (error) {
        console.error("Error extracting key content:", error);
        return null;
    }
}

// Function to make an asynchronous API call to the OpenAI API
async function openAI_API_Completions(prompt) {
    const API_KEY = "openAIKey";  // Replace with OpenAI API key

    // Ensure the API key is provided
    if (!API_KEY) {
        console.error("Please provide your OpenAI API key.");
        return;
    }
    try {
        const response = await fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + API_KEY
            },
            body: JSON.stringify({
                'model': "text-davinci-003",
                'prompt': prompt,
                'temperature': 0.5,
                'max_tokens': 50,
            })
        });
        if (!response.ok) {
            console.error("HTTP ERROR: " + response.status + "\n" + response.statusText);
        } else {
            const data = await response.json();
            createResponse(data);
        }
    } catch (error) {
        console.error("ERROR: " + error);
    }
    
}

function createResponse(json) {
    let response = "";
    
    let choices = removePeriod(json.choices);
    if (choices.length > 0) {
        response = json.choices[0].text
        //json.choices[0].index
        //json.choices[0].logprobs
        //json.choices[0].finish_reason
    }
    console.log("Response:")
    console.log(response)
    return response;
}

function removePeriod(json) {
    json.forEach(function (element, index) {
        if (element === ".") {
            json.splice(index, 1);
        }
    });
    return json;
}



const webpageUrl = 'https://wordpress.com/ppc/create-blog-campaign/?utm_source=google&utm_campaign=google_search_wpcom_acquisition_non_us_en_treatment_3&utm_medium=paid_search&keyword=blog&creative=653396930324&campaignid=19327492947&adgroupid=147550088791&matchtype=e&device=c&network=g&targetid=kwd-21745101&utm_content=&gclid=EAIaIQobChMI4Z2DhpTlgQMVuCezAB2pMA73EAAYAiAAEgLUmfD_BwE';
extractKeyContent(webpageUrl)
    .then(content => {
        if (content) {
            console.log("Key Content:", content);
            openAI_API_Completions(content);
        } else {
            console.log("Failed to fetch key content.");
        }
    });