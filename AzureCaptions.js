// Azure Vision AI API endpoint
const endpoint = 'https://altifyimagecaptioning.cognitiveservices.azure.com/vision/v3.1/analyze';

// API key or subscription key
const subscriptionKey = '74126c3d9f5c4f0c8c4c43cfeaca8474';

// Image URL as public https
const imageUrl = 'https://learn.microsoft.com/en-us/azure/ai-services/computer-vision/media/quickstarts/presentation.png'; // or you can use binary image data

// Request parameters
const params = {
    visualFeatures: '', // You can customize this
    details: 'Celebrities, Landmarks',
    language: 'en',
};

// Request headers
const headers = new Headers({
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': subscriptionKey,
});

// Request body
const requestBody = {
    url: imageUrl, // You can also use 'binary' if you're sending image data instead of a URL.
    params: params,
};

// Construct the request
const request = new Request(endpoint, {
    method: 'POST',
    redirect: 'follow',
    headers: headers,
    body: JSON.stringify(requestBody),
});

// Make the API call
async function analyzeImage() {
    fetch(request)
        .then((response) => {
            if (response.ok) {
                return response.text();
            } else {
                // display response status text in the console if an error occurs
                console.log(response)
                console.log(response.status);
                console.log(response.statusText);
                throw new Error('Request failed.');
            }
        })
        .then(data => {
            // Handle the response data here
            console.log('\n-----Response from Azure-----\n');
            console.log(data);

            // Access and log the description
            const description = data.description.captions[0].text;
            console.log('Image Description:', description);
        })
        .catch(error => {
            // Handle any errors
            console.error(error);
        });
}

// test(endpoint);
analyzeImage();