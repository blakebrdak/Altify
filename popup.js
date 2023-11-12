// document.getElementById('myButton').addEventListener('click', function() {
//     console.log('Button clicked!');
//     const inputBox = document.getElementById('inputBox');
//
//     const inputValue = inputBox.value;
//     const output = document.getElementById('output');
//     output.innerText = 'input: ' + inputValue;
// });
// document.addEventListener('DOMContentLoaded', function() {
//     chrome.storage.sync.get('finish', function(result) {
//         console.log('Value currently is ' + result['finish']);
//         // Update your popup's DOM here
//         if (result['finish']) {
//             document.getElementById('output').textContent = 'Finished';
//         }
//     });
// });
document.addEventListener('DOMContentLoaded', function() {
    chrome.runtime.sendMessage({action: "get_status"}, function(response) {
        document.getElementById('output').textContent = response.status;
    });
});

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === "pageLoaded") {
        console.log("Page has loaded");
    } else if (message.action === "apiCallCompleted") {
        if (message.success) {
            console.log("API call successful", message.data);
        } else {
            console.error("API call failed", message.error);
        }
    }
});
