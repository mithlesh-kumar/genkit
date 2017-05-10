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

var repoQuestion = [
    {
        name: 'versioningtool',
        type: 'input',
        message: 'Enter your versioning tool:',
        validate: function( value ) { return notEmpty( value ); }
    },
    {
        name: 'username',
        type: 'input',
        message: 'Enter your username:',
        validate: function( value ) { return notEmpty( value ); }
    },
    {
        name: 'password',
        type: 'password',
        message: 'Enter your password:',
        validate: function( value ) { return notEmpty( value ); }
    },
    {
        name: 'repo',
        type: 'input',
        message: 'Enter project repo url:',
        validate: function( value ) { return notEmpty( value ); }
    }
];

function notEmpty( val ) {
    return !val ? false : true;
}

inquirer.prompt( repoQuestion ).then(
    function ( inputs ) {
        console.log(
            chalk.green('successfully recieved all values')
        );

        console.log(inputs);

    }
);

