const {promises: fs} = require('fs');
const path = require('path');

const {getCompanyAndDateFromFile} = require('../src/utils/file')

const parseResponseBodyPrintout = (test) => {
    const responseBodyPrintout = Object.keys(test)[0]

    const trimmed = responseBodyPrintout
        .substring('Response Body Printout= ('.length, responseBodyPrintout.length - 1)

    return JSON.parse(trimmed)

}
const readAllTests = (allTests) => {
    return allTests.map(parseResponseBodyPrintout)
}  

const getTweetInformationFromFile = async (filePath) => {
    const {company, year} = getCompanyAndDateFromFile(filePath)

    const tweet = await fs.readFile(filePath, 'utf8')
    const json = JSON.parse(tweet)
    const stringifiedJson = json.results[0].allTests

    return {
        company,
        year,
        allTests: readAllTests(stringifiedJson) 
    }
}

module.exports = getTweetInformationFromFile
