const userInput1 = document.getElementById('input1');
const userInput2 = document.getElementById('input2');
// const userInput3 = document.getElementById('input3');
// const userInput4 = document.getElementById('input4');
// const userInput5 = document.getElementById('input5');
const saveButton = document.getElementById('saveButton');
let array = [userInput1, userInput2]
saveButton.addEventListener('click', () => {
  // for (let i = 0; i < array.length; i++) {
  //   const inputValue = array[i].value;
  //   // const inputValue = userInput1.value;
  //   let key_i = 'userInput' + String(i);
  //   let obj = {};
  //   obj[key_i] = inputValue;
  //   chrome.storage.sync.set(obj, () => {
  //     if (chrome.runtime.lastError) {
  //       console.log('Error: ', chrome.runtime.lastError);
  //   } else {
  //       console.log('Value is set to ' + inputValue);
  //     }
  //   });
  // }
    const inputValue0 = userInput1.value;
    // const inputValue = userInput1.value;
    chrome.storage.sync.set({ "userInput1": inputValue0 }, () => {
      if (chrome.runtime.lastError) {
        console.log('Error: ', chrome.runtime.lastError);
    } else {
        console.log('Value is set to ' + inputValue0);
      }
    });
    const inputValue1 = userInput2.checked;
    // const inputValue = userInput1.value;
    chrome.storage.sync.set({"userInput2":inputValue1}, () => {
      if (chrome.runtime.lastError) {
        console.log('Error: ', chrome.runtime.lastError);
    } else {
        console.log('Value is set to ' + inputValue1);
      }
    });
    // const inputValue2 = array[2].value;
    // // const inputValue = userInput1.value;
    // chrome.storage.sync.set({"userInput3":inputValue2}, () => {
    //   if (chrome.runtime.lastError) {
    //     console.log('Error: ', chrome.runtime.lastError);
    // } else {
    //     console.log('Value is set to ' + inputValue2);
    //   }
    // });
    // const inputValue3 = array[3].value;
    // // const inputValue = userInput1.value;
    // chrome.storage.sync.set({"userInput4":inputValue3}, () => {
    //   if (chrome.runtime.lastError) {
    //     console.log('Error: ', chrome.runtime.lastError);
    // } else {
    //     console.log('Value is set to ' + inputValue3);
    //   }
    // });
    // const inputValue4 = array[4].value;
    // // const inputValue = userInput1.value;
    // chrome.storage.sync.set({"userInput5":inputValue4}, () => {
    //   if (chrome.runtime.lastError) {
    //     console.log('Error: ', chrome.runtime.lastError);
    // } else {
    //     console.log('Value is set to ' + inputValue4);
    //   }
    // });

    alert('save successfully!')
  document.getElementById('status').textContent = 'save successfully!';
  setTimeout(() => {document.getElementById('status').textContent = '';}, 800);
});

window.onload = function() {
    let key1 = 'userInput1'
    chrome.storage.sync.get(key1, (data) => {
      userInput1.value = data[key1];
    });
    let key2 = 'userInput2'
    chrome.storage.sync.get(key2, (data) => {
      userInput2.checked = data[key2];
    });
}
