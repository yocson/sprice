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

program
  .command('price <symbol>')
  .alias('p')
  .option('-p --price', 'Query price of compony')
  .option('-c --componey', 'Componey information')
  .action(priceQuery);
  
program
  .command('')

program.parse(process.argv);

