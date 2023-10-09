# Altify

## GenAI 

**Update:** The codes using GenAI to summarize web page content have been added to content.js.

**Functions:** 

- Extract contents from web page for the OpenAI API to summarize it. 
- Find the images lacking alt text and save the responses from genAI API to their "img.alt".
- The max number of response tokens can be adjusted in content.js.

**Usage:** In the content.js file,  find`"const API_KEY = "openAIAPI"; "`, replace openAIAPI with the actual OpenAI API Key. This line can be modified later cause we had better not hard coding the API Key into this script for security. I have an OpenAI API Key now. If you guys prefer to share an API key, then I could share the key number. (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)

**Next Step:** 

- Integrate both of the labels generated from cloud vision API and the interpretation of web page content into the prompts of genAI API. 
- Update the web page content after generating all the alt text

**Sample Usage:**
https://drive.google.com/file/d/1M37ob1FQdyUqBxGXnXxI3HQ9LB5gKfby/view?usp=sharing
https://drive.google.com/file/d/1Wayc_xwPMs8kRpi4XCvUM9ZwDHKb_DLG/view?usp=sharing
