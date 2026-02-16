const http = require('http');
const url = process.argv[2];

http.get(url, function (response) {
    response.setEncoding('utf8');
    let completeData = '';

    response.on('data', chunk => {
        completeData += chunk;
    });
    response.on('end', () => {
        console.log(completeData.length);
        console.log(completeData);
    });
    response.on('error', console.error);
});