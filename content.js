// function uploades the image url to the server
async function testUpload(url){
        var requestOptions = {
      method: 'POST',
      redirect: 'follow'
    };

    result = await fetch("http://localhost:8000/uploadImage?url="+url, requestOptions);
    return result.text();
      // .then(response => response.text())
      // .then(result => console.log(result), console.log(url))
      // .catch(error => console.log('error', error));
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


async function openAI_API_Completions(prompt) {
  const API_KEY = "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";  // Replace with OpenAI API key
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
} // end openAI_API_Completions

// start of main code
let images = document.getElementsByTagName('img');
// let images = 'https://etherjump.game/assets/whiteLogo.png';
for (img of images){
  if (!img.alt || img.alt === "") {
    img.alt = "This image was missing alt text... bummer.";
    const labels = testUpload(img.src);
    output = 'test';
    labels.then(function(result){
      if (result.length !== 2){
        console.log("alt text generated for image: " + result);
        img.alt = result;
        // for the length of the result, add each label to the prompt
        // const prompt = "Give a brief 15 word description for an image with the following labels: " + result;
        // // print out all the labels from the result individually

        // openAI_API_Completions(prompt).then(function(result){
        //   console.log("alt text generated:" + result);

        // });
      }
      else {
        console.log("no alt text generated for image")
      }
    });
  }
}
chrome.runtime.sendMessage({status: "completed", message: "Content script has finished running!"}, response => {console.log(response);});

// end of main code