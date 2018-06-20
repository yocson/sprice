#!/usr/bin/env node
const program = require("commander");
const co = require("co");
const prompt = require('co-prompt');
const https = require('https');
const colors = require('colors');

program
  .command('search <symbol>')
  .alias('s')
  .option('-p --price', 'Query price of compony')
  .action(function(symbol, args){
    console.log(symbol);
    https.get(`https://api.iextrading.com/1.0/stock/${symbol}/price`, (res) => {
        console.log('statusCode:', res.statusCode);
        res.on('data', (d) => {
            console.log(colors.green('Price: '));
            process.stdout.write(d);
            console.log('');
        });
    }).on('error', (e) => {
        console.error(e);
    });
  });

program.parse(process.argv);

