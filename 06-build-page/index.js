let fs = require('fs');

let fsPromises = fs.promises;

let path = require('path');

let directory = path.join(__dirname, 'project-dist');

(async function createFolder() {

    fsPromises.mkdir(directory, {recursive: true});


    let takeComponents = path.join(__dirname, 'components');
    let pasteComponents = path.join(__dirname, 'template.html');

    let createHTML = path.join(directory, 'index.html');

    let template = await fsPromises.readFile(pasteComponents, 'utf-8');

    let writer = await fsPromises.writeFile(createHTML, template);
    let reader = await fsPromises.readFile(createHTML, 'utf-8');

    let takeArticles = /{{articles}}/g;
    let pasteArticles = await fsPromises.readFile((path.join(takeComponents, 'articles.html')), 'utf-8');

    let takeFooter = /{{footer}}/g;
    let pasteFooter = await fsPromises.readFile((path.join(takeComponents, 'footer.html')), 'utf-8');

    let takeHeader = /{{header}}/g;
    let pasteHeader = await fsPromises.readFile((path.join(takeComponents, 'header.html')), 'utf-8');


    let indexHTML = reader.replace(takeHeader, pasteHeader).replace(takeArticles, pasteArticles).replace(takeFooter, pasteFooter);

    let resultWriter = await fsPromises.writeFile(createHTML, indexHTML);

})()

let takeStyles = path.join(__dirname, 'styles');
let pasteStyles = path.join(__dirname, 'project-dist/style.css');

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


(async function copyAssetsFolder() {

    const directory = './06-build-page/project-dist/assets';

    try {
        for (const file of await fsPromises.readdir(directory)) {

            await fsPromises.unlink(path.join(directory, file));
        }
    } catch (err) {
    }

    fsPromises.mkdir('./06-build-page/project-dist/assets', {recursive: true});

    let files = await fsPromises.readdir('./06-build-page/assets');

    files.forEach(async (item, num) => {

        try {
            for (const file of await fsPromises.readdir(`./06-build-page/project-dist/assets/${item}`)) {

                await fsPromises.unlink(path.join(`./06-build-page/project-dist/assets/${item}`, file));
            }
        } catch (err) {
        }

        fsPromises.mkdir(`./06-build-page/project-dist/assets/${item}`, {recursive: true});

        let files = await fsPromises.readdir(`./06-build-page/assets/${item}`);

        files.forEach((file, i) => {
            fsPromises.copyFile(path.join(`./06-build-page/assets/${item}`, files[i]), path.join(`./06-build-page/project-dist/assets/${item}`, files[i]));

        })

    })

})()