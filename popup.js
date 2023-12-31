document.addEventListener('DOMContentLoaded', function() {
    chrome.runtime.sendMessage({action: "get_status"}, function(response) {
        document.getElementById('output').textContent = response.status;
    });
    chrome.storage.sync.get("Reminder", (data) => {
      if (chrome.runtime.lastError) {
        console.log('Error: ', chrome.runtime.lastError);
    } else if (data.Reminder){
        document.getElementById("content").innerHTML = `
        <img class="logo" src="images/Logo.PNG">
        <h1>Welcome to Altify!</h1>
        <p id="output">waiting</p>
        `
      }
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

document.getElementById("nextPage").addEventListener("click", function() {
    console.log(document.getElementById("header").innerHTML)
    if (document.getElementById("header").innerHTML === 'Enjoy Your Reading'){
        const inputValue1 = document.getElementById("if_remind").checked;
        chrome.storage.sync.set({ "Reminder": inputValue1 }, () => {
          if (chrome.runtime.lastError) {
            console.log('Error: ', chrome.runtime.lastError);
          }
        });
        document.getElementById("content").innerHTML = `
        <img class="logo" src="images/Logo.PNG">
        <h1>Welcome to Altify!</h1>
        <p id="output">Altify is working in the background!</p>
        `
    }
    else {
        document.getElementById("content1").innerHTML = `
        <h1 id="header">Enjoy Your Reading</h1>
        <p tabindex="0">Altify works automatically in the background! Just get browsing, and Altify will fill in Alt text where it is missing, keeping your browsing experience seamless. Use the sidebar to view generated text!</p>
        <label>
            <input type="checkbox" id="if_remind" value="1"> Don't show this again:
        </label>
        `;
    }
});
