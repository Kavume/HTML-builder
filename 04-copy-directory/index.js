let fs = require('fs').promises;

let path = require('path');

(async function copyFolder() {

    const directory = "./04-copy-directory/files-copy";

    try {
        for (const file of await fs.readdir(directory)) {

            await fs.unlink(path.join(directory, file));
        }
    } catch (err){}

    fs.mkdir('./04-copy-directory/files-copy', {recursive: true});

    let files = await fs.readdir('./04-copy-directory/files');

    files.forEach( (item, num) => {
        fs.copyFile( path.join('./04-copy-directory/files', files[num]), path.join('./04-copy-directory/files-copy', files[num]));

    })

})();