// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');

// Creates a client
const client = new vision.ImageAnnotatorClient();

// const fileName = '/Users/marsh/Desktop/code/eecs495/cat-sleep-in-blanket.jpeg'; // local file
const fileName = 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png'; // public https file

process.env.GOOGLE_APPLICATION_CREDENTIALS = '/Users/marsh/Desktop/code/eecs495/cloud vision key/rapid-hangar-400218-6ecfd79e051c.json';

async function labelDetection(fileName) {
  try {
    // Performs label detection on the local file
    const [result] = await client.labelDetection(fileName);
    labels = result.labelAnnotations.map(label => label.description);
    // Map the descriptions to an array of strings and return it
    return labels;
  } catch (error) {
    console.error('Error:', error);
    // Return an empty array if there is an error
    return [];
  }
}


// Call the async function and print output labels
labelDetection(fileName).then(labels => {console.log('Labels:');
labels.forEach(label => console.log(label));
}).catch(error => {console.error('Error:', error);});

// important info
// for each label, there is a score (confidence)
// labels are sorted by confidence
// score is a float between 0 and 1