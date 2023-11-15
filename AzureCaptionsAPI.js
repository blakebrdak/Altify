// Description: This file contains the code to make the API call to Azure Cognitive Services Computer Vision API

// Make the API call
async function analyzeImage(imageUrl) {
    console.log('\n-----Request to Azure-----\n');
    console.log(imageUrl);
    // make the request format for the API call
    // Azure Vision AI API endpoint
    const endpoint = 'https://altify-blake-resource.cognitiveservices.azure.com/vision/v3.1/analyze?visualFeatures=Description&language=en';


    // Image URL as public https
    // EXAMPLE:
    // const imageUrl = 'https://learn.microsoft.com/en-us/azure/ai-services/computer-vision/media/quickstarts/presentation.png'; // or you can use binary image data

    // Request headers
    const headers = new Headers({
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': subscriptionKey,
    });

    // Request body
    const requestBody = {
        url: imageUrl, // You can also use 'binary' if you're sending image data instead of a URL.
    };

    // Construct the request
    const request = new Request(endpoint, {
        method: 'POST',
        redirect: 'follow',
        headers: headers,
        body: JSON.stringify(requestBody),
    });
    
    return await fetch(request)
        .then((response) => {
            if (response.ok) {
                // do nothing if the response is ok
                return response.text();
            } else {
                // display response status text in the console if an error occurs
                console.log('\n-----ERROR Response from Azure-----\n');
                console.log(response)
                console.log(response.status);
                console.log(response.statusText);
                throw new Error('Request failed.');
            }
        })
        .then(data => {
            // Handle the response data here
            console.log('\n-----Response from Azure-----\n');
            data = JSON.parse(data);
            console.log(data);

            // Display the image caption
            console.log('\n-----Image Caption-----\n');
            console.log(data.description.captions[0]);

            // Return the image caption
            return data.description.captions[0].text;
        })
        .catch(error => {
            // Handle any errors
            console.error(error);
        });
} // end analyzeImage

main();

// export function analyzeImage() to be used by NODEJS-server.js
module.exports = { analyzeImage };