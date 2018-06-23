#!/usr/bin/env node

const program = require("commander"),
      co = require("co"),
      prompt = require('co-prompt'),
      https = require('https'),
      colors = require('colors'),
      chalk = require('chalk'),
      concatStream = require('concat-stream'),
      log = console.log;

function fetchContent(url, fun) {
    let d = undefined;
    https.get(url, (res) => {
        if (res.statusCode === 200) {
            if (res.statusCode === 200) {
                res.setEncoding('utf8');
                res.pipe(concatStream((data) => {
                    fun(data);
                }));
            }
        }
    }).on('error', (e) => {
        console.error(e);
    });
}

function priceQuery(symbol, args) {
    const url = `https://api.iextrading.com/1.0/stock/${symbol}/price`;
    log(chalk.green.bold('Company:'), chalk.blue(symbol.toUpperCase()));
    process.stdout.write(chalk.green.bold('Prices:  '));
    fetchContent(url, (data) => {
        log(chalk.green(data));
    });
}

function companyQuery(symbol, args) {
    const url = `https://api.iextrading.com/1.0/stock/${symbol}/company`;
    log(colors.green('Company: '));
    fetchContent(url);
}

function newsQuery(symbol, args) {
    const num = args.number;
    log(num);
    const url = `https://api.iextrading.com/1.0/stock/${symbol}/news/last/${num}`;
    log(url)
    log(colors.green('News: '));
    fetchContent(url);
}

function openCloseQuery(symbol, args) {
    const url = `https://api.iextrading.com/1.0/stock/${symbol}/ohlc`;
    log(colors.green('OHLC: '));
    fetchContent(url);
}

function earningsQuery(symbol, args) {
    const url = `https://api.iextrading.com/1.0/stock/${symbol}/earnings`;
    log(colors.green('Earnings: '));
    fetchContent(url);
}

function chartQuery(symbol, args) {
    const timep = args.timeperiod ? args.timeperiod : '';
    const url = `https://api.iextrading.com/1.0/stock/${symbol}/chart/${timep}`;
    log(colors.green('Chart: '));
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
  .option('-n --number <n>', 'number of news, 1-50', '[1..50]', '10')
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

