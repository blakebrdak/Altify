// user info.
// you need express js downloaded to run this server
// server is currently running locally on port 8000

var cloudVision = require('./CloudVisionApi.js');
const express = require('express')
var cors = require('cors')


const app = express()
const port = 8000

app.use(cors())

app.post('/uploadimage', (req, res) => {
    console.log(req.query.url);
    cloudVision.labelDetection(req.query.url).then(labels => {
        res.send(labels);
    }).catch(error => {
        console.error('Error:', error);
        res.send([]);
    });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// function testUpload(url){
//     var requestOptions = {
//   method: 'POST',
//   redirect: 'follow'
// };

// fetch("http://localhost:8000/uploadImage?url="+url, requestOptions)
//   .then(response => response.text())
//   .then(result => console.log(result), console.log(url))
//   .catch(error => console.log('error', error));
// }
// let images = document.getElementsByTagName('img');
// for (img of images) {
//     testUpload(img.src)
// }