document.getElementById('myButton').addEventListener('click', function() {
    console.log('Button clicked!');
    const inputBox = document.getElementById('inputBox');

    const inputValue = inputBox.value;
    const output = document.getElementById('output');
    output.innerText = 'input: ' + inputValue;
});
