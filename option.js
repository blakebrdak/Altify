
// saveButton.addEventListener('click', () => {
//   const userInput1 = document.getElementById('input1');
//   const userInput2 = document.getElementById('input2');
//   // const userInput3 = document.getElementById('input3');
//   // const userInput4 = document.getElementById('input4');
//   // const userInput5 = document.getElementById('input5');
//   const saveButton = document.getElementById('saveButton');
//   let array = [userInput1, userInput2]
//   // for (let i = 0; i < array.length; i++) {
//   //   const inputValue = array[i].value;
//   //   // const inputValue = userInput1.value;
//   //   let key_i = 'userInput' + String(i);
//   //   let obj = {};
//   //   obj[key_i] = inputValue;
//   //   chrome.storage.sync.set(obj, () => {
//   //     if (chrome.runtime.lastError) {
//   //       console.log('Error: ', chrome.runtime.lastError);
//   //   } else {
//   //       console.log('Value is set to ' + inputValue);
//   //     }
//   //   });
//   // }
//     const inputValue0 = array[0].value;
//     // const inputValue = userInput1.value;
//     chrome.storage.sync.set({ "userInput1": inputValue0 }, () => {
//       if (chrome.runtime.lastError) {
//         console.log('Error: ', chrome.runtime.lastError);
//     } else {
//         console.log('Value is set to ' + inputValue0);
//       }
//     });
//     const inputValue1 = array[1].value;
//     // const inputValue = userInput1.value;
//     chrome.storage.sync.set({"userInput2":inputValue1}, () => {
//       if (chrome.runtime.lastError) {
//         console.log('Error: ', chrome.runtime.lastError);
//     } else {
//         console.log('Value is set to ' + inputValue1);
//       }
//     });
//     // const inputValue2 = array[2].value;
//     // // const inputValue = userInput1.value;
//     // chrome.storage.sync.set({"userInput3":inputValue2}, () => {
//     //   if (chrome.runtime.lastError) {
//     //     console.log('Error: ', chrome.runtime.lastError);
//     // } else {
//     //     console.log('Value is set to ' + inputValue2);
//     //   }
//     // });
//     // const inputValue3 = array[3].value;
//     // // const inputValue = userInput1.value;
//     // chrome.storage.sync.set({"userInput4":inputValue3}, () => {
//     //   if (chrome.runtime.lastError) {
//     //     console.log('Error: ', chrome.runtime.lastError);
//     // } else {
//     //     console.log('Value is set to ' + inputValue3);
//     //   }
//     // });
//     // const inputValue4 = array[4].value;
//     // // const inputValue = userInput1.value;
//     // chrome.storage.sync.set({"userInput5":inputValue4}, () => {
//     //   if (chrome.runtime.lastError) {
//     //     console.log('Error: ', chrome.runtime.lastError);
//     // } else {
//     //     console.log('Value is set to ' + inputValue4);
//     //   }
//     // });

//     alert('save successfully!')
//   document.getElementById('status').textContent = 'save successfully!';
//   setTimeout(() => {document.getElementById('status').textContent = '';}, 800);
// });

window.onload = function() {
  for (let i = 0; i < array.length; i++) {
    let key_i = 'userInput' + String(i)
    chrome.storage.sync.get(key_i, (data) => {
      array[i].value = data[key_i];
    });
  }
}


// to dynamically display language value
document.addEventListener('DOMContentLoaded', function() {
  var langSelect = document.getElementById('input1');

  // Retrieve the saved language value from chrome.storage.sync
  chrome.storage.sync.get(["userInput1"], function(data) {
      var savedLang = data.userInput1;

      // Set the selected option based on the saved language
      if (savedLang) {
          langSelect.value = savedLang;
      }
  });

  // Add an event listener to save the selected language when it changes
  langSelect.addEventListener('change', function() {
      var selectedLang = langSelect.value;

      // Save the selected language to chrome.storage.sync
      chrome.storage.sync.set({ 'userInput1': selectedLang }, function() {
          console.log("Selected language is set to " + selectedLang);
      });
  });
});

// to dynamically display checkbox value
document.addEventListener('DOMContentLoaded', function() {
  var checkSelect = document.getElementById('input2');

  // Retrieve the saved checkbox state from chrome.storage.sync
  chrome.storage.sync.get(["userInput2"], function(data) {
      var savedCheck = data.userInput2; // Fix: Change "userInput1" to "userInput2"

      // Remove the event listener temporarily
      checkSelect.removeEventListener('change', checkboxChangeHandler);

      // Set the checkbox state based on the saved value
      if (savedCheck !== undefined) {
          checkSelect.checked = savedCheck; // Assuming savedCheck is a boolean
      }

      // Add the event listener back
      checkSelect.addEventListener('change', checkboxChangeHandler);
  });

  // Add an event listener to save the checkbox state when it changes
  checkSelect.addEventListener('change', checkboxChangeHandler);

  function checkboxChangeHandler() {
      var isChecked = checkSelect.checked;

      // Save the checkbox state to chrome.storage.sync
      chrome.storage.sync.set({ 'userInput2': isChecked }, function() {
          console.log("Checkbox state is set to " + isChecked);
      });
  }
});
