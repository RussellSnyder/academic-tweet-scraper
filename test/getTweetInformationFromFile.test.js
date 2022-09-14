const fs = require('fs')
const assert = require('assert')

const {MOCK_INPUT_FILE} = require('./config')

const getTweetInformationFromFile = require('../src/getTweetInformationFromFile')

describe('getTweetInformationFromFile', function () {
    let tweetInformation;
    before(async function() {
        tweetInformation = await getTweetInformationFromFile(MOCK_INPUT_FILE)
    })

    it('returns an array', function () {
        assert.ok(Array.isArray(tweetInformation.allTests))
    })

    it('returns an array of objects', function () {
        assert.equal(typeof tweetInformation.allTests[0], 'object')
    })

    it('each object contains data and meta key', function () {
        tweetInformation.allTests.forEach(tweetInfo => {
            assert.ok(tweetInfo.data)
            assert.ok(tweetInfo.meta)
        })
    })

    it('returns correct company and year', function () {
        assert.equal(tweetInformation.company, 'testCompany')
        assert.equal(tweetInformation.year, '2015')
    })

    // after(function() {
    //     fs.writeFileSync('test/mocks/tweetInformationFromFile.json', JSON.stringify(tweetInformation, null, 2) , 'utf-8');
    // })
});