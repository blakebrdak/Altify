// Description: This file contains the code to make the API call to Azure Cognitive Services Computer Vision API

var lang = ''
// background.js or any other main extension script
chrome.storage.sync.get(["userInput1"]).then((data) => {
  lang = data.userInput1;
  if (!lang) {
    chrome.storage.sync.set({ 'userInput1': 'en' }).then(() => {
      //console.log("Value is set"); uncomment for debug
    });
  }
  //console.log('Option retrieved-lang:', lang);

  // Use the option value as needed in your extension logic
});

var generateForAll = false;
chrome.storage.sync.get(["userInput2"]).then((data) => {
  generateForAll = data.userInput2;
  if (generateForAll === undefined) {
    chrome.storage.sync.set({ 'userInput2': false }).then(() => {
      //console.log("Value is set"); uncomment for debug
    });
  }
  //console.log('Option retrieved-generateForAll:', generateForAll);

  // Use the option value as needed in your extension logic
});

var showConsoleText = true;
chrome.storage.sync.get(["userInput3"]).then((data) => {
  showConsoleText = data.userInput3;
  if (showConsoleText === undefined) {
    chrome.storage.sync.set({ 'userInput3': true }).then(() => {
      //console.log("Value is set"); uncomment for debug
    });
  }
  //console.log('Option retrieved-showConsoleText:', showConsoleText);

  // Use the option value as needed in your extension logic
});


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
        body: `{"url": "${imgURL}", "lang": "${lang}"}` // Convert the data to JSON format
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

function injectSidebar() {
    // fetch(chrome.runtime.getURL('sidebar.html'))
    //     .then(response => response.text())
    //     .then(data => {
    //         document.body.insertAdjacentHTML('beforeend', data);
    //         document.getElementById('toggleSidebar').addEventListener('click', toggleSidebar);
    //     }).catch(err => console.log(err));
    fetch(chrome.runtime.getURL('sidebar.html'))
        .then(response => response.text())
        .then(data => {
            let div = document.createElement('div');
            div.innerHTML = data;

            document.body.appendChild(div);

            let cssLink = document.createElement('link');
            cssLink.href = chrome.runtime.getURL('/css/sidebar.css');
            cssLink.type = 'text/css';
            cssLink.rel = 'stylesheet';
            document.head.appendChild(cssLink);
            let mySidebar = document.getElementById('mySidebar');
            let toggleButton = document.getElementById('toggleButton');
            let loadButton = document.getElementById('loadButton')
            toggleButton.addEventListener('click', function() {
                console.log(mySidebar.style.width)
                if (!mySidebar.style.width || mySidebar.style.width === '300px') {
                    mySidebar.style.width = '0';
                    toggleButton.innerHTML = 'Open Sidebar';
                } else {
                    mySidebar.style.width = '300px';
                    toggleButton.innerHTML = 'Close Sidebar';
                }
            });
            loadButton.addEventListener('click', function (){
                let altTextList = document.getElementById("altTextList");
                altTextList.innerHTML = ''; // Clear existing content
                // Fetch alt texts from Local Storage and append to altTextList
                let images = document.getElementsByTagName('img');
                for (const img of images) {
                    if (img.alt.includes("Generated by Altify: ")) {
                        let title = document.createElement('h2');
                        title.textContent = img.alt;
                        let image = document.createElement('img');
                        image.src = img.src;
                        image.alt = img.alt.slice(21)
                        altTextList.appendChild(title);
                        altTextList.appendChild(image);
                    }
                }
            });
        })
        .catch(err => console.error('Error loading sidebar:', err));
}

function closeSidebar() {
    document.getElementById('mySidebar').style.width = '0';
}


async function main(){
    // get all the images on the current web page
    // 2 second timeout ensures images have had adequate time to load
    // Potentially replace with something that makes it execute when page is loaded?
    setTimeout( () => {
    let images = document.getElementsByTagName('img');
    injectSidebar();
    const imagePromises = [];

    for (const img of images) {
      // If the image does not have alt text
      if (!img.alt || img.alt === "" || generateForAll) {
        // check image is larger than 50px by 50px
        // console.log('width: ', img.width, " height: ", img.height)
        if (img.width < 50 || img.height < 50) { // there is a limit on image size for the API
          if(showConsoleText) {
            console.log("Image is too small to generate alt text.");
          }
          continue; // skip this image
        }
        
        // Get the labels for the image
        const imagePromise = azure_call(img.src)
          .then(imageDescription => {
            // Set the alt text to the labels
            if (imageDescription == "There was an Error sending the image to Azure. Make sure the resource exists and is accessible to the API.") {
              if (showConsoleText) {
                console.log("There was an Error sending the image to Azure. Make sure the resource exists and is accessible to the API.");
              }
              img.alt = "";
            }
            else {
              if(showConsoleText) {
                console.log("imageDesc: ", imageDescription);
              }
              img.alt = "Generated by Altify: " + imageDescription;
            }
          });

        imagePromises.push(imagePromise);
      }
    }

    // Wait for all promises to resolve
    Promise.all(imagePromises)
      .then(() => {
        // All image alt attributes have been set
        if(showConsoleText) {
          console.log("All alt attributes have been set.");
        }
      })
      .catch(error => {
        console.error("Error setting alt attributes:", error);
      });
    }, 2000)
} // end main

main();