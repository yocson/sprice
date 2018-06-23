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

function openCloseQuery(symbol, args) {
    const url = `https://api.iextrading.com/1.0/stock/${symbol}/ohlc`;
    console.log(colors.green('OHLC: '));
    fetchContent(url);
}

function earningsQuery(symbol, args) {
    const url = `https://api.iextrading.com/1.0/stock/${symbol}/earnings`;
    console.log(colors.green('Earnings: '));
    fetchContent(url);
}

function chartQuery(symbol, args) {
    const timep = args.timeperiod ? args.timeperiod : '';
    const url = `https://api.iextrading.com/1.0/stock/${symbol}/chart/${timep}`;
    console.log(colors.green('Chart: '));
    fetchContent(url);
}

program
  .description('Price')
  .command('price <symbol>')
  .alias('p')
  .action(priceQuery);

program
  .description('Company information')
  .command('company <symbol>')
  .alias('co')
  .action(companyQuery);

program
  .description('News for this company')
  .command('news <symbol>')
  .alias('n')
  .action(newsQuery);

program
  .description('Open close price')
  .command('oc <symbol>')
  .action(openCloseQuery);

program
  .description('Four most recent reported quarters')
  .command('earnings <symbol>')
  .alias('e')
  .action(earningsQuery);

program
  .command('chart <symbol>')
  .option('-t --timeperiod <t>', 'choose time period', ('1d'|'1m'|'3m'|'6m'|'1y'|'2y'|'5y'), '')
  .alias('ch')
  .action(chartQuery)

program.parse(process.argv);

