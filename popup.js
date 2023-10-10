// document.getElementById('myButton').addEventListener('click', function() {
//     console.log('Button clicked!');
//     const inputBox = document.getElementById('inputBox');
//
//     const inputValue = inputBox.value;
//     const output = document.getElementById('output');
//     output.innerText = 'input: ' + inputValue;
// });
document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.sync.get('finish', function(result) {
        console.log('Value currently is ' + result['finish']);
        // Update your popup's DOM here
        if (result['finish']) {
            document.getElementById('output').textContent = 'Finished';
        }
    });
});
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.status === "updatePopup") {
        document.getElementById('output').innerText = request.message;
        console.log('completed')
    }
    setTimeout(() => {document.getElementById('status').textContent = '';}, 800);
});
