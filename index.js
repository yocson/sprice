#!/usr/bin/env node
console.log('Hello, world!');
const program = require("commander");
const co = require("co");
const prompt = require('co-prompt');

program
  .arguments('<file>')
  .option('-u, --username <username>', 'The user to atuhenticate as')
  .option('-p, --password <password>', 'The user\'s password')
  .action(function(file) {
    co(function *() {
            let username = yield prompt('username: ');
            let password = yield prompt.password('password: ');
            console.log('user: %s pass: %s file: %s',
                username, password, file);
    });
  })
  .parse(process.argv);
