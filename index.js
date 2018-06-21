#!/usr/bin/env node
const program = require("commander"),
      co = require("co"),
      prompt = require('co-prompt'),
      https = require('https'),
      colors = require('colors');


function priceQuery(symbol, args) {
    https.get(`https://api.iextrading.com/1.0/stock/${symbol}/price`, (res) => {
        // console.log('statusCode:', res.statusCode);
        if (res.statusCode === 200) {
            res.on('data', (d) => {
                console.log(colors.green('Price: '));
                process.stdout.write(d);
                console.log('');
            }); 
        }
    }).on('error', (e) => {
        console.error(e);
    });
}

function companyQuery(symbol, args) {
    https.get(`https://api.iextrading.com/1.0/stock/${symbol}/company`, (res) => {
        // console.log('statusCode:', res.statusCode);
        if (res.statusCode === 200) {
            // res.setEncoding('utf8');
            res.on('data', (d) => {
                console.log(colors.green('Company: '));
                // process.stdout.write(d);
                let info = JSON.parse(d);
                console.log(info);
                console.log(info.companyName);
            }); 
        }
    }).on('error', (e) => {
        console.error(e);
    });
}

function newsQuery(symbol, args) {
    https.get(`https://api.iextrading.com/1.0/stock/${symbol}/news`, (res) => {
        console.log('statusCode:', res.statusCode);
        if (res.statusCode === 200) {
            res.setEncoding('utf8');
            res.on('data', (d) => {
                console.log(colors.green('News: '));
                process.stdout.write(d);
                let info = JSON.parse(d);
                console.log(info);
            }); 
        }
    }).on('error', (e) => {
        console.error(e);
    });
}

program
  .command('price <symbol>')
  .alias('p')
  .action(priceQuery);
  
program
  .command('company <symbol>')
  .alias('c')
  .action(companyQuery);

program
  .command('news <symbol>')
  .alias('n')
  .action(newsQuery);

program.parse(process.argv);

