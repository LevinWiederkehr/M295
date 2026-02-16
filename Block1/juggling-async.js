const http = require('http');
const url = process.argv.slice(2);
const results = [];
let count = 0;

function printResults() {
    results.forEach(result => console.log(result));
}

function httpGet(index) {
    http.get(url[index], function (response) {
        response.setEncoding('utf8');
        let completeData = '';

        response.on('data', chunk => {
            completeData += chunk;
        });

        response.on('end', () => {
            results[index] = completeData;
            count++;
            if (count === url.length) {
                printResults();
            }
        });
    });
}

for (let i = 0; i < url.length; i++) {
    httpGet(i);
}