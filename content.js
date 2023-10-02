console.log('extension doing shit bro');
let images = document.getElementsByTagName('img');
for (img of images) {
    if (!img.alt || img.alt === "") {
        img.alt = "This image was missing alt text... bummer."
    }
}