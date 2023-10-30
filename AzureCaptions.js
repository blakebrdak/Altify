

// Get the visual feature for analysis
// list of possible features
// ['Categories','Brands','Adult','Color','Description','Faces','Image_type','Objects','Tags'];
// const features = ['Categories','Brands','Adult','Color','Description','Faces','Image_type','Objects','Tags']; // set visual features to return image description
// const domainDetails = ['Celebrities','Landmarks']; // allows for more detailed description by including celebrities and landmarks
// language = 'en'; // set language to english

// Azure Vision AI API endpoint
const endpoint = 'https://altifyimagecaptioning.cognitiveservices.azure.com/vision/v3.0/analyz';

// API key or subscription key
const subscriptionKey = '10ee63fbd0fb40eb8fd5b353f06b0f13';

// Image URL as public https
const imageUrl = 'https://etherjump.game/assets/whiteLogo.png'; // or you can use binary image data

// Request parameters
const params = {
    visualFeatures: 'Categories, Description, Tags, Caption', // You can customize this
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
    
console.log(request);


// Make the API call
async function analyzeImage() {
    fetch(request)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                // display response status text in the console if an error occurs
                console.log(response.status);
                console.log(response.statusText);
                throw new Error('Request failed.');
            }
        })
        .then(data => {
            // Handle the response data here
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


analyzeImage();