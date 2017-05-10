#!/usr/bin/env node

var inquirer = require('inquirer');
var clear = require('clear');
var files = require('./lib/files');
var chalk = require('chalk');
var figlet = require('figlet');
var vtool = require('svn-spawn');
var program = require('commander');

var repoClient;

clear();
logger(
    {
        color: 'yellow',
        message: figlet.textSync('GenKit', { horizontalLayout: 'full' })
    }
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
    if ( !val ) {
        logger( { color: 'red', message: 'Required field!!' } );
        return false;
    }
    return true;
}

function setupSVN ( config ) {
    repoClient = new vtool(
        {
            cwd: config.repo,
            username: config.username,
            password: config.password,
            noAuthCache: true
        }
    );
logger(repoClient);
    repoClient.getInfo(function(e,d){console.log(e,d)});
}

function logger( options ) {
    var setLogColor;
    if ( options.hasOwnProperty('color') && options.color ) {
        setLogColor = chalk[ options.color ];
    }

    var message;
    if ( typeof setLogColor == 'function' ) {
        message = setLogColor( options.message );
    } else {
        message = options;
    }
    
    if ( message ) {
        console.log( message );
    }
}

program
    .version('0.0.1')
    .command('run')
    .action(function(){

        inquirer.prompt( repoQuestion ).then(
            function ( inputs ) {
                logger( { color: 'green', message:'successfully recieved all values' } );
                logger( inputs );
                logger(inputs.versioningtool.toLowerCase() == 'svn');
                if ( inputs.repo.toLowerCase() == 'svn' ) {
                    setupSVN( inputs );
                    getSVNInfo();
                }
            }
        );
    });

function getSVNInfo() {
    repoClient.getInfo(
        function(err, data) {
                                console.log('subcommand done', err, data);
            try{
            if ( err ) {
                repoClient.cmd(['co', '--option1=xx', '--option2=xx', 'arg1', 'arg2'], function(err, data) {
                    console.log('subcommand done', err, data);
                });
            }}catch(e) {
                logger(e);
            }
            console.log('Repository url is %s', data.url);
        }
    );
}

program.parse(process.argv);

