'use strict';

const {promises: fs} = require('fs');

const getTweetInformationFromFile = require('./src/getTweetInformationFromFile')
const parseTweetInformationAndWriteToFile = require('./src/parseTweetInformationAndWriteToFile')

const {TWEETS_FOLDER, CSV_FOLDER} = require('./config')

const {getCurrentDateString} = require('./src/utils/date')


const processData = async () => {
  const tweetFolderContents = await fs.readdir(TWEETS_FOLDER)
  const filesToProcess = tweetFolderContents.filter(name => name !== '.gitkeep')

  // create the file which will store all the results
  const output_file = `${CSV_FOLDER}/${getCurrentDateString()}.csv`
  await fs.writeFile(output_file, 'For Dave With Love \n\n', (err) => {
    console.log('error writing to output', err)
  })

  let completedFiles = 0
  let rowCount = 0

  for (const fileName of filesToProcess) {
    const file = `${TWEETS_FOLDER}/${fileName}`

    const data = await getTweetInformationFromFile(file)
  
    await parseTweetInformationAndWriteToFile(data, output_file)
    completedFiles += 1
    rowCount += data.allTests.map(t => t.data).flat().length
    console.log(`${completedFiles} of ${filesToProcess.length} processed`)
    console.log(`${rowCount} rows created`)
  }

  console.log('There you go, Dave! Have fun with that :-)')
};

processData()