#!/bin/sh
':' //; exec "$(command -v nodejs || command -v node)" "$0" "$@"

const fileLoader = require('./file_loader');
const yargs = require('yargs');
const cmd = 'load-file';
const mySqlTools = require('./mysql_tools');

const argv = yargs
    .command('load-file', 'Loads the content of the specified file into a MySQL DB Table.', {
        file: {
            description: 'The file to be loaded.',
            alias: 'f',
            type: 'string',
            demandOption: true
        }
    })
    .option('conn-str', {
        alias: 'cs',
        description: 'The MySQL DB Connection String. Format ["mysql://usr:pwd@host:port/dbname"]',
        type: 'string',
        demandOption: true
    })
    .option('table-name', {
        alias: 'tb',
        description: 'The Table Name where to place the data.',
        type: 'string',
        demandOption: true
    })
    .option('has-header', {
        alias: 'hh',
        description: 'Specifies if the file has a column header.',
        type: 'boolean',
        default: true
    })
    .option('batch-size', {
        alias: 'bs',
        description: 'Specifies the size of the insert batch.',
        type: 'number',
        default: 20
    })
    .demandCommand(1, 'You need at least one command before moving on.')
    .help()
    .alias('help', 'h')
    .argv;

if (!argv._.includes(cmd)) throw Error('Invalid command!');

// Function to use while loading the file
function loadRecordsToDB(connStr, tableName) {
    mySqlTools.connect(connStr);
    return function (records) {
        mySqlTools.insertRecords(tableName, records);
    }
}

fileLoader.loadFile(argv.file, loadRecordsToDB(argv.connStr, argv.tableName), (result, err) => {

    if (err) {
        console.log('An error has ocurred!');
        console.log(err);
    } else console.log('Process Completed!');

    mySqlTools.disconnect();
}, argv.batchSize, argv.hasHeader);
