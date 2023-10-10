async function processImages() {
    let images = document.getElementsByTagName('img');

    for (let img of images) {
        if (!img.alt || img.alt === "") {
            // fileName = img.src
            // let labels = labelDetection(fileName);
            // img.alt = "Generated labels:"+labels.join();
            // console.log(img.alt);
            const maxWordCount = 300;
            extractKeyContentAndTrim(img, maxWordCount);
        }
    }
    chrome.runtime.sendMessage({status: "completed", message: "Content script has finished running!"});
}

// Call the function to process images
processImages();

function extractWebpageContent() {
    const textContent = document.body.textContent.trim();
    return textContent;
}

// Function to extract key content and trim if necessary
async function extractKeyContentAndTrim(img, maxWordCount) {
    const content = extractWebpageContent();
    if (content) {
        const wordCount = content.split(/\s+/).length;
        // Add more sentences to the prompt
        const prompt = `Give a summary of the following web content:\n${content}`;
        if (wordCount > maxWordCount) {
            // Trim the content to the specified word count
            const words = content.split(/\s+/);
            const trimmedContent = words.slice(0, maxWordCount).join(' ');
            img.alt = await openAI_API_Completions( `Give a summary of the following web content:\n${trimmedContent}`);  
            console.log(await img.alt);
        } else {
            img.alt = await openAI_API_Completions(prompt);
            console.log(await img.alt);
        }
    } else {
        console.log("Failed to extract webpage content.");
    }
}



// Function to make an asynchronous API call to the OpenAI API
// may need to avoid hard coding the openAI key in this script
async function openAI_API_Completions(prompt) {
    const API_KEY = "openAIAPI";  // Replace with OpenAI API key
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
                'max_tokens': 100,
            })
        });
        if (!response.ok) {
            console.error("HTTP ERROR: " + response.status + "\n" + response.statusText);
        } else {
            const data = await response.json();
            return createResponse(data);
        }
    } catch (error) {
        console.error("ERROR: " + error);
    }
    
}

function createResponse(json) {
    let response = "";
    let choices = removePeriod(json.choices);
    if (choices.length > 0) {
        response = json.choices[0].text;
    }
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

