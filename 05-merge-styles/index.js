let fs = require('fs');

let fsPromises = fs.promises;

let path = require('path');

let takeStyles = path.join(__dirname, 'styles');

let pasteStyles = path.join(__dirname, 'project-dist/bundle.css');

let writer = fs.createWriteStream(pasteStyles);

fsPromises.readdir(takeStyles).then(async (files) => {

    files.forEach(async (item, num) => {

        let stylesFolder = path.join(takeStyles, item);

        let fileStyles = await fsPromises.readdir(takeStyles);

        if (fileStyles[num].includes('css')) {

            let reader = fs.createReadStream(path.join(takeStyles, path.basename(stylesFolder)));

            reader.on('data', data => {
                writer.write(data.toString() + '\n');
            });
        }
    });

});