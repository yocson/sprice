#!/usr/bin/env node
const program = require("commander"),
      co = require("co"),
      prompt = require('co-prompt'),
      https = require('https'),
      colors = require('colors'),
      concatStream = require('concat-stream');

function fetchContent(url) {
    https.get(url, (res) => {
        if (res.statusCode === 200) {
            if (res.statusCode === 200) {
                res.setEncoding('utf8');
                res.pipe(concatStream((data) => {
                    console.log(data);
                }));
            }
        }
    }).on('error', (e) => {
        console.error(e);
    });
}

function priceQuery(symbol, args) {
    const url = `https://api.iextrading.com/1.0/stock/${symbol}/price`;
    console.log(colors.green('Price: '));
    fetchContent(url);
}

function companyQuery(symbol, args) {
    const url = `https://api.iextrading.com/1.0/stock/${symbol}/company`;
    console.log(colors.green('Company: '));
    fetchContent(url);
}

function newsQuery(symbol, args) {
    const url = `https://api.iextrading.com/1.0/stock/${symbol}/news`;
    console.log(colors.green('News: '));
    fetchContent(url);
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

