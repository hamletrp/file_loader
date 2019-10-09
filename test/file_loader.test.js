const assert = require('assert');
const fileLoader = require('../file_loader')

describe('file_loader', function () {
    describe('#loadFile()', function () {
        it('should return Error Code \'ENOENT\' when the file does not exists.', function () {

            fileLoader.loadFile('not/existing/file.file', ()=>{}, (result, err) => {
                assert.equal(err.code, 'ENOENT', 'Error code MUST BE <ENOENT> on a non existing file event.');
            });

        });
    });
});
