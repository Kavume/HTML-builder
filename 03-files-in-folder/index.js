let fs = require('fs');

let path = require('path');

fs.readdir('./03-files-in-folder/secret-folder', (err, files) => {

    files.forEach( file => {

        fs.stat(`./03-files-in-folder/secret-folder/${file}`, (error, stats) => {
            if (error) {
                console.log(error);
                return;
            }

            if (!stats.isDirectory()) {
                console.log(path.basename(`${file}`, path.extname(`${file}`)), '-', path.extname(`${file}`).substring(1), '-', stats.size / 1000, "kb");

            }

        });

    });
});