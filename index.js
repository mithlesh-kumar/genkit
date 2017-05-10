#!/usr/bin/env node

var inquirer = require('inquirer');
var clear = require('clear');
var files = require('./lib/files');
var chalk = require('chalk');
var figlet = require('figlet');

clear();
console.log(
    chalk.yellow(
        figlet.textSync('GenKit', { horizontalLayout: 'full' })
    )
);

var authQuestion = [
    {
        name: 'username',
        type: 'input',
        message: 'Enter your username:',
        validate: function( value ) { return true; }
    },
    {
        name: 'password',
        type: 'password',
        message: 'Enter your password:',
        validate: function( value ) { return true; }
    }
];

inquirer.prompt(authQuestion).then(
    function () {
        console.log(
            chalk.green('successfully recieved all values')
        );

        
    }
);

