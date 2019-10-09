const fs = require('fs');
const url = require('url');
const logger = require('./logger').logger;
const readline = require('readline');

function loadFile(fileToLoad, perLineOrBatchFn, callBack, batchSize = 20, hasColumnsHeader = true) {

    if(typeof perLineOrBatchFn != 'function') throw TypeError('<perLineOrBatchFn> Parameter must be a function that receives the read item(s) as per the batch size.');
    if(typeof callBack != 'function') throw TypeError(`<callBack> Parameter must be a function that receives an object with a property <totalRecordsLoaded> indicating the total number of loaded records; Or an error object.`);

    try {

        let fileUrl = url.pathToFileURL(fileToLoad);
        let filePath = fileUrl.pathname;

        // using readline nodejs built-in module to keep it simple/safe
        // other options are available like https://www.npmjs.com/package/line-reader
        const fileStream = fs.createReadStream(filePath);

        // error handling to manage missing access on the provided file 
        fileStream.on('error', (err) => {
            let errMessage = err.code;
            switch (err.code) {
                case 'ENOENT':
                    errMessage = `The specified file does not exist. File path: [ ${filePath} ]`;
                    break;
                case 'EACCES':
                    errMessage = 'Missing file read access.';
                    break;
                default:
                    errMessage = `An unknown error has ocurred. Please review the logs and search for code [${err.code}]`;
                    logger.error(err);
                    break;
            }
            logger.error(errMessage);
            console.log(errMessage);
            return callBack(undefined, err);
        })

        console.log(`Starting to read the file: [ ${filePath} ].`);
        logger.info(`Starting to read the file: [ ${filePath}. ]`);
        const readLines = readline.createInterface({
            input: fileStream,
            output: process.stdout,
            terminal: false
        });

        let recordsLoaded = 0;
        let records = [];
        readLines.on('line', (line) => {
            recordsLoaded++;

            if (hasColumnsHeader && recordsLoaded > 1){
                let data = line.split(',');
                if(records.push([`${data[0]}`, `${data[1]}`, `${data[2]}`, Number(data[3])]) === batchSize){
                    console.log(`Inserting batch of ${batchSize}.`);
                    logger.info(`Inserting batch of [ ${batchSize} ].`);
                    perLineOrBatchFn(records);
                    records = [];
                }
            }
            else {
                console.log('skipping column header.');
                logger.info('skipping column header.');
            }
        });

        readLines.on('close', () => {

            // completes records insertion if any pending 
            if(records.length > 0){
                perLineOrBatchFn(records);
                logger.info(`Last batch of ${records.length} inserted.`);
                console.log(`Last batch of ${records.length} inserted.`);
                
            }

            let completeMessage = `Completing file upload. Records loaded [ ${hasColumnsHeader ? --recordsLoaded : recordsLoaded} ].`;
            logger.info(completeMessage);
            console.log(completeMessage);
            callBack({
                totalRecordsLoaded: recordsLoaded
            });
        })

    } catch (err) {
        console.log('unnexpected error::::');
        console.log(err);
        logger.error(err);
        return callBack(undefined, err);
    }
}

module.exports = {
    loadFile: loadFile
}

// TODO: to write unit tests

