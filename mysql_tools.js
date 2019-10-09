var mysql = require('mysql');
const { parseUri } = require('mysql-parse')
const logger = require('./logger').logger;

var connection = undefined;

// Server=myServerAddress;Database=myDataBase;Uid=myUsername;Pwd=myPassword;
function connectToDB(connStr){
    let connProps = parseUri(connStr)
    connection = mysql.createConnection({
        host: connProps.host,
        user: connProps.user,
        password: connProps.password,
        database: connProps.database,
        port: connProps.port,
        debug: false,
    });

    connection.connect(function (err) {
        if (err) {
            logger.error(`error connecting to DB:  ${err.stack} `);
            return;
        }
    });
}

function insertRecords(tableName, records){

    let sql = `INSERT INTO ${tableName} (launch_date, title, privacy, likes) VALUES ?`;

    let query = connection.query(sql, [records], function (err, result) {
        if(err){
            let errMessage = `Error inserting records into Database: ${err}`;
            logger.error(err);
            console.log(errMessage);
        }
        // console.log('result');
        // console.log(result);
    });
}

function disconnect() {
    connection.end();
}

module.exports = {
    connect: connectToDB,
    insertRecords: insertRecords,
    disconnect: disconnect
}
