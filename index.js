#!/usr/bin/env node

const program = require("commander"),
    co = require("co"),
    prompt = require('co-prompt'),
    https = require('https'),
    colors = require('colors'),
    chalk = require('chalk'),
    concatStream = require('concat-stream'),
    prettyjson = require('prettyjson'),
    inquirer = require('inquirer');

const log = console.log;

const baseURL = 'https://api.iextrading.com/1.0/stock/';

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
    const url = baseURL + `${symbol}/price`;
    log(chalk.green.bold('Company:'), chalk.blue(symbol.toUpperCase()));
    process.stdout.write(chalk.green.bold('Price:   '));
    fetchContent(url, (data) => {
        log(chalk.green(data));
    });
}

function companyQuery(symbol, args) {
    const url = baseURL + `${symbol}/company`;
    // process.stdout.write(colors.green('Company: '));
    fetchContent(url, (data) => {
        const d = JSON.parse(data);
        let options = {
            keysColor: 'rainbow',
            dashColor: 'magenta',
            stringColor: 'white'
        };
        log(prettyjson.render(d, options))
    });
}

function newsQuery(symbol, args) {
    const num = args.number;
    const url = baseURL + `${symbol}/news/last/${num}`;
    // log(colors.green('News: '));
    fetchContent(url, (data) => {
        const d = JSON.parse(data);
        let list = [];
        d.forEach((news, index) => {
            // log(chalk.green(index + 1) + ' ' + news.headline.replace(/&apos;/g, '\'') + '(' + chalk.blue.underline(news.url) + ')');
            let choice = {
                key: String(index + 1),
                name: 'news' + index + 1,
                value: news.url
            }
            list.push(choice);
            // list.push(chalk.green(index + 1) + ' ' + news.headline.replace(/&apos;/g, '\'');
        })
        log(list);
        inquirer
            .prompt([
                {
                    type: 'expand',
                    name: 'news',
                    message: 'Here is the latest news',
                    choices: list,
                }
            ])
            .then(answers => {
                log(JSON.stringify(answers, null, '  '));
            });
        // let options = {
        //     keysColor: 'rainbow',
        //     dashColor: 'magenta',
        //     stringColor: 'white'
        // };
        // log(prettyjson.render(d, options))
    });
}

function openCloseQuery(symbol, args) {
    const url = baseURL + `${symbol}/ohlc`;
    // log(colors.green('OHLC: '));
    fetchContent(url, (data) => {
        const d = JSON.parse(data);
        log(chalk.green.bold.bgBlack('Symbol:'), chalk.blue(symbol.toUpperCase()));
        log(chalk.green.bold.bgBlack('open:  '), chalk.green(d.open.price));
        log(chalk.green.bold.bgBlack('close: '), chalk.green(d.close.price));
        log(chalk.green.bold.bgBlack('high:  '), chalk.green(d.high));
        log(chalk.green.bold.bgBlack('low:   '), chalk.green(d.low));
        // let options = {
        //     keysColor: 'rainbow',
        //     dashColor: 'magenta',
        //     stringColor: 'white'
        // };
        // log(prettyjson.render(d, options));
    });
}

function earningsQuery(symbol, args) {
    const url = baseURL + `${symbol}/earnings`;
    log(colors.green('Earnings: '));
    fetchContent(url, (data) => {
        const d = JSON.parse(data);
        let options = {
            keysColor: 'green',
            dashColor: 'magenta',
            stringColor: 'white'
        };
        log(prettyjson.render(d, options))
    });
}

function chartQuery(symbol, args) {
    const timep = args.timeperiod ? args.timeperiod : '';
    const url = baseURL + `${symbol}/chart/${timep}`;
    log(colors.green('Chart: '));
    fetchContent(url, (data) => {
        const d = JSON.parse(data);
        let options = {
            keysColor: 'rainbow',
            dashColor: 'magenta',
            stringColor: 'white'
        };
        log(prettyjson.render(d, options))
    });
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
    .option('-n --number <n>', 'number of news, 1-50', '10')
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
    .option('-t --timeperiod <t>', 'choose time period', ('1d' | '1m' | '3m' | '6m' | '1y' | '2y' | '5y'), '')
    .alias('ch')
    .action(chartQuery)

program.parse(process.argv);

