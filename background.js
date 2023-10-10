chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({"finish": false}, () => {
      if (chrome.runtime.lastError) {
        console.log('Error: ', chrome.runtime.lastError);
    } else {
        console.log('status is set to waiting');
      }
    });
});
chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
        if(request.status === "completed") {
            console.log(request.message); // logs: "Content script has finished running!"
            sendResponse({status: "received", message: "Background script has received your message! Sending it to popup!"});
            chrome.runtime.sendMessage({type: "updatePopup", data: "New Value"});
            chrome.storage.sync.set({"finish": true}, () => {});
        }
    }
);
