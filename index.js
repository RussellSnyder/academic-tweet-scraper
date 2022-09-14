'use strict';

const {promises: fs} = require('fs');

const getTweetInformationFromFile = require('./src/getTweetInformationFromFile')
const parseTweetInformationAndWriteToFile = require('./src/parseTweetInformationAndWriteToFile')

const {TWEETS_FOLDER, CSV_FOLDER, CSV_COLUMNS} = require('./config')

const {getCurrentDateString} = require('./src/utils/date')
const {createCSVFileIfNoneExistent, getCompanyAndDateFromFile} = require('./src/utils/file')

const processData = async () => {
  const tweetFolderContents = await fs.readdir(TWEETS_FOLDER)
  const filesToProcess = tweetFolderContents.filter(name => name !== '.gitkeep')

  // create the file which will store all the results
  const output_folder = `${CSV_FOLDER}/results-${getCurrentDateString()}`

  await fs.mkdir(output_folder);

  let completedFiles = 0
  let rowCount = 0

  for (const fileName of filesToProcess) {
    const inputFile = `${TWEETS_FOLDER}/${fileName}`
    const {company, year} = getCompanyAndDateFromFile(fileName)

    const outputFile = `${output_folder}/${company}.csv`
    await createCSVFileIfNoneExistent(outputFile)

    console.log(`\nProcessing ${company}_${year}`)
    const data = await getTweetInformationFromFile(inputFile)  
    await parseTweetInformationAndWriteToFile(data, outputFile)

    completedFiles += 1
    rowCount += data.allTests.map(t => t.data).flat().length
    console.log(`${completedFiles} of ${filesToProcess.length} processed`)
    console.log(`${rowCount} rows created\n`)
  }

  console.log('There you go, Dave! Have fun with that :-)')
};

processData()