let fs = require('fs');

let reader = fs.createReadStream('./01-read-file/text.txt');

reader.on('data', data => console.log(data.toString()) );