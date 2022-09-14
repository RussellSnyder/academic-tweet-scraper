const {promises: fs} = require('fs');
const assert = require('assert')

const parseTweetInformationAndWriteToFile = require('../src/parseTweetInformationAndWriteToFile')

const {MOCK_OUTPUT_FILE, MOCK_READ_FILE} = require('./config.js')

describe('parseTweetInformationAndWriteToFile', function () {
    let rawTweetInformation

    before(async function() {
        // empty output file
        await fs.writeFile(MOCK_OUTPUT_FILE, '', (err) => {
            console.log('error writing to output', err)
        })

        const json = await fs.readFile(MOCK_READ_FILE, 'utf8')
        rawTweetInformation = JSON.parse(json)

        // save new data
        await parseTweetInformationAndWriteToFile(rawTweetInformation, MOCK_OUTPUT_FILE)
    })

    it('reads test data as an array of objects', function () {
        assert.ok(Array.isArray(rawTweetInformation.allTests))
        assert.equal(typeof rawTweetInformation.allTests[0], 'object')
    })

    it('writes a csv file with the expected number of lines', async function() {
        const expectedTweetCount = rawTweetInformation.allTests.reduce((prev, curr) => prev += curr.meta.result_count ,0)

        const csvFileData = await fs.readFile(MOCK_OUTPUT_FILE, 'utf8', (err, data) => {
            if (err) {
              console.error('error', err);
            }
            return data
          });
        
        assert.ok(csvFileData)

        const csvDataLength = csvFileData.split('\n').length
        // Some entries are multiple lines, but there should be at least as many as expected
        assert.ok(csvDataLength > expectedTweetCount)
    })
});