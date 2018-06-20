#!/usr/bin/env node
const program = require("commander");
const co = require("co");
const prompt = require('co-prompt');
console.log('Hello World');

program
  .command('search <symbol>')
  .alias('s')
  .option('-p --price', 'Query price of compony')
  .action(function(symbol, args){
    console.log(symbol);
  });

program.parse(process.argv);

