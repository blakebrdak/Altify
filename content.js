let images = document.getElementsByTagName('img');
for (img of images) {
    if (!img.alt || img.alt === ""){
        // GOOGLE CLOUD VISION PROMPT
        let labels = ['cat', 'dog']
        // Open AI API call
        // OPENAI result is 
        img.alt = "This image was missing alt text... bummer." // Save openAI result here
    }
}