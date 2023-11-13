let currentStatus = 'Refresh the Page';

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === 'modify_status') {
        currentStatus = message.status;
        console.log(message.status)
    }
    else{
        sendResponse({status: currentStatus});
    }
});

function getCurrentStatus() {
    return currentStatus;
}
