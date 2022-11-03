let fs = require('fs');

const writer = fs.createWriteStream('./02-write-file/text.txt');

process.stdout.write('Please, enter your text below...\n\n');

process.stdin.on('data', function (data) {

    let targetStop = data.toString().trim();

    if (targetStop === 'exit') {
        process.stdout.write('See you later!');
        process.exit();
    }
    writer.write(data);
})

process.on('SIGINT', () => {
    process.stdout.write('See you later!');
    process.exit();
});