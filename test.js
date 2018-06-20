const https = require('https');

https.get('https://api.iextrading.com/1.0/stock/aapl/company', (res) => {
    console.log('statusCode:', res.statusCode);
    console.log('headers:', res.headers);

    res.on('data', (d) => {
        process.stdout.write(d);
    });
}).on('error', (e) => {
    console.error(e);
});
