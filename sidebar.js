function openSidebar() {
    document.getElementById("mySidebar").style.width = "250px";
    loadAltTexts();
}

function closeSidebar() {
    document.getElementById("mySidebar").style.width = "0";
}

function loadAltTexts() {
    let altTextList = document.getElementById("altTextList");
    altTextList.innerHTML = ''; // Clear existing content
    // Fetch alt texts from Local Storage and append to altTextList
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let value = localStorage.getItem(key);
        let div = document.createElement("div");
        div.innerHTML = `Key: ${key}, Alt Text: ${value}`;
        altTextList.appendChild(div);
    }
}
