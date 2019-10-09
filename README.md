File Loader: A simple command line script to load data from a file into a table in a mysql database. Bulking the records in form of batches.
==============================================

[![NPM Version][npm-version-image]][npm-url]
[![Node.js Version][node-image]][node-url]

------------------------------------------------------------------------

## Install

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).

Before installing, [download and install Node.js](https://nodejs.org/en/download/).
Node.js 12+ is required.

Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```sh
$ npm install homer_file_loader
```

Or by cloning the repository

```sh
$ git clone https://github.com/hamletrp/file_loader.git
```

## Introduction

This is a node.js CLI Script.

## Here is how to use it:

There are 2 ways to use this package; As an standalone project/package or as part of another project/package. Next the steps for each case:

### As a standalone project/package

1. Clone the repo [ https://github.com/hamletrp/file_loader.git ]
2. cd into the cloned repo directory
3. Install the dependencies
4. Ensure that the script file has the proper execution permissions, if not, then proceed to provide permissions [ chmod u+x ./file_loader_invoker.js ]
5. Visualize Package's help and understand it's usage
    * ./file_loader_invoker.js help
    * ./file_loader_invoker.js --help
    * ./file_loader_invoker.js -h
6. Examples of how to use the script
    * ./file_loader_invoker.js load-file --file <filePath> --conn-str <connStr> --table-name <tableName>
    * ./file_loader_invoker.js load-file --file <filePath> --conn-str <connStr> --table-name <tableName> --batch-size <batch-size>
    * ./file_loader_invoker.js load-file --file <filePath> --conn-str <connStr> --table-name <tableName> --batch-size <batch-size> --has-header <true | false>
    * ./file_loader_invoker.js load-file --file <filePath> --conn-str <connStr> --table-name <tableName>  --has-header <true | false>
7. The script will keep you informed of it's progress via the terminal. It also keeps INFO & ERROR logs in a directory named [logs] placed in the root directory. 

### As part of another project/package

1. Install the package [ npm i homer_file_loader ]
4. Ensure that the script file has the proper execution permissions, if not, then proceed provide permissions [ chmod u+x ./node_modules/homer_file_loader/file_loader_invoker.js ]
5. Visualize Package's help and understand it's usage
    * ./node_modules/homer_file_loader/file_loader_invoker.js help
    * ./node_modules/homer_file_loader/file_loader_invoker.js --help
    * ./node_modules/homer_file_loader/file_loader_invoker.js -h
6. Examples of how to use the script
    * ./node_modules/homer_file_loader/file_loader_invoker.js load-file --file <filePath> --conn-str <connStr> --table-name <tableName>
    * ./node_modules/homer_file_loader/file_loader_invoker.js load-file --file <filePath> --conn-str <connStr> --table-name <tableName> --batch-size <batch-size>
    * ./node_modules/homer_file_loader/file_loader_invoker.js load-file --file <filePath> --conn-str <connStr> --table-name <tableName> --batch-size <batch-size> --has-header <true | false>
    * ./file_loader_invoker.js load-file --file <filePath> --conn-str <connStr> --table-name <tableName>  --has-header <true | false>
7. The script will keep you informed of it's progress via the terminal. It also keeps INFO & ERROR logs in a directory named [logs] placed in the root directory. 
 

### Additionally

One could place the invokation script as a npm script in the package.json file as usual.


## Commandline options

* `--version`: Shows the Package's version.
* `--file, -f`: The file to be loaded.
* `--conn-str, --cs`: The MySQL DB Connection String. Format ["mysql://usr:pwd@host:port/dbname"]'
* `--table-name, --tb`: The TableName where to place the data.
* `--batch-size, --bs`: Specifies the size of the bulk insert.
* `--has-header, --hh`: Specifies if the file has a column header.

## Running tests

The test suite only contains a single unit test at the moment. Using [Mocha](https://github.com/mochajs/mocha).

### Running unit tests

```sh
npm test
```

### Running integration tests

###### To come ######
