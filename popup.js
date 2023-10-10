// document.getElementById('myButton').addEventListener('click', function() {
//     console.log('Button clicked!');
//     const inputBox = document.getElementById('inputBox');
//
//     const inputValue = inputBox.value;
//     const output = document.getElementById('output');
//     output.innerText = 'input: ' + inputValue;
// });

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.status === "completed") {
        document.getElementById('output').innerText = request.message;
        console.log('completed')
    }
    setTimeout(() => {document.getElementById('status').textContent = '';}, 800);
});
