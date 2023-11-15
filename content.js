// Description: This file contains the code to make the API call to Azure Cognitive Services Computer Vision API

// Make the API call
async function analyzeImage(imageUrl) {
  console.log('\n-----Request to Azure-----\n');
  console.log(imageUrl);
  // make the request format for the API call
  // Azure Vision AI API endpoint

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
          console.log('\n-----Image Description-----\n');
          console.log(data.description.captions[0]);

          return data.description.captions[0].text;
      })
      .catch(error => {
          // Handle any errors
          console.error(error);
      });
} // end analyzeImage

async function azure_call(imgURL) {
    const url = "https://us-central1-altify-404015.cloudfunctions.net/Azure-Request-Middleman";
    const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Set the content type for JSON data
        },
        body: `{"url": "${imgURL}"}` // Convert the data to JSON format
      })
        .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
        return response.text(); // or response.text() for plain text
        })
        .then(data => {
          return data;
        })
        .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
        });
    return response;
}

async function main(){
    // get all the images on the current web page
    // 2 second timeout ensures images have had adequate time to load
    // Potentially replace with something that makes it execute when page is loaded?
    setTimeout( () => {
    let images = document.getElementsByTagName('img');

    // for (img of images){
    //     // if the image does not have alt text
    //     if (!img.alt || img.alt === "") {
    //         // set the alt text to a default message
    //         //img.alt = "This image was missing alt text... bummer.";
    //         // get the labels for the image
    //         azure_call(img.src)
    //             .then(imageDescription => {
    //                 // set the alt text to the labels
    //                 console.log("imageDesc: ", imageDescription)
    //                 img.alt = "alt text generated for image: " + imageDescription;
    //             })
            
    //     }
    // }
    const imagePromises = [];

    for (const img of images) {
      // If the image does not have alt text
      if (!img.alt || img.alt === "") {
        // check image is larger than 50px by 50px
        // console.log('width: ', img.width, " height: ", img.height)
        if (img.width < 50 || img.height < 50) { // there is a limit on image size for the API
          console.log("Image is too small to generate alt text.");
          continue; // skip this image
        }
        
        // Get the labels for the image
        const imagePromise = azure_call(img.src)
          .then(imageDescription => {
            // Set the alt text to the labels
            console.log("imageDesc: ", imageDescription);
            img.alt = "Generated Text: " + imageDescription;
          });

        imagePromises.push(imagePromise);
      }
    }

    // Wait for all promises to resolve
    Promise.all(imagePromises)
      .then(() => {
        // All image alt attributes have been set
        console.log("All alt attributes have been set.");
      })
      .catch(error => {
        console.error("Error setting alt attributes:", error);
      });
    }, 2000)
} // end main

main();