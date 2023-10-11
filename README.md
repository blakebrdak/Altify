# Altify

## GenAI 

**Update:** The codes using GenAI and Googgle Cloud Vision to summarize web page content have been added to content.js.

**Functions:** 

- Extract contents from web page the https address for each image that is missing alt text. 
- Sends image to an express js server sp the image can be sent to google cloud vision
- sets the alt text for the found images to be the return from the google cloud vision api call..


**Usage:** Server.js needs to be running while the extension is running. To do this you must insall express js by running the following command 
"npm install express" 
in a terminal in the directory where the server.js will be run.
to run the server you then use the comman
node server
this will run the server until told to stop.

From there you must set up a google cloud vision project and get an API key and the google cloud vision sdk.
The process on how to do this can be found here:
https://cloud.google.com/vision/docs/setup

After setting up the two steps above you can download the main folder of the git hub and unpack it to google chrome extensions.
chrome://extensions/
Go to the link above and turn on developer mode in the top right corner. From there press load unpacked and select the folder containing the downloaded content from the github main branch.

Now with server running you can visit any webpage containing images and check either the console of the server or the console in google chrome by pressing shift+command+c (on mac) or accessing it through developer tools.

**Next Step:** 

- Integrate both of the labels generated from cloud vision API and the interpretation of web page content into the prompts of genAI API. 
- Update the web page content after generating all the alt text
- investigate direct descrition generation to avoid label generation

**Sample Usage:**
https://drive.google.com/file/d/1M37ob1FQdyUqBxGXnXxI3HQ9LB5gKfby/view?usp=sharing
https://drive.google.com/file/d/1Wayc_xwPMs8kRpi4XCvUM9ZwDHKb_DLG/view?usp=sharing
