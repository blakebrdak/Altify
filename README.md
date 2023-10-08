# Altify

## GenAI 

**Update:** The codes using GenAI to summarize web page content have been added to content.js.

**Functions:** 

- Extract contents from web page for the OpenAI API to summarize it. 
- Find the images lacking alt text and save the responses from genAI API to their "img.alt".
- The max number of response tokens can be adjusted in content.js.

**Usage:** In the content.js file,  find`"const API_KEY = "openAIAPI"; "`, replace openAIAPI with the actual OpenAI API Key. This line can be modified later cause we had better not hard coding the API Key into this script for security. 

**Next Step:** 

- Integrate both of the labels generated from cloud vision API and the interpretation of web page content into the prompts of genAI API. 
- Update the web page content after generating all the alt text

**Sample Usage:**

![image-20231007234711434](C:\Users\Belinda\AppData\Roaming\Typora\typora-user-images\image-20231007234711434.png)

![image-20231007235023242](C:\Users\Belinda\AppData\Roaming\Typora\typora-user-images\image-20231007235023242.png)
