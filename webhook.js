const express = require('express');
const app = express();
const port = 3000;

// json middleware
app.use(express.json());

app.post('/webhook', async (req, res) => {
    console.log(req.body)
  if (!req.body) {
    res.status(400).send("NO BODY!")
  }
  else if (!req.body.url) {
    res.status(400).send("NO URL!")
  }
  else {
    let resText = await analyzeImage(req.body.url)
    // Handle the incoming webhook data here
    console.log("resText:", resText)
    res.status(200).send(resText);
  }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

exports.webhook = app;

async function analyzeImage(imageUrl) {
    console.log('\n-----Request to Azure-----\n');
    console.log(imageUrl);
    // make the request format for the API call
    // Azure Vision AI API endpoint
    const endpoint = 'https://altify-blake-resource.cognitiveservices.azure.com/vision/v3.1/analyze?visualFeatures=Description&language=en';

    // API key or subscription key
    const subscriptionKey = '577414208d1545fab49275a1268beacd';

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
            return "There was an Error sending the image to Azure. Make sure the resource exists and is accessible to the API."
        });
} // end analyzeImage
