const fs = require('fs')
const {CSV_COLUMNS} = require('../config')
const {
    getDateFromDateTime,
    getTimeFromDateTime
} = require('./utils/date')

const formatCsvString = (tweetInformation) => {
    const {allTests, company, year} = tweetInformation

    const tweets = allTests.map(t => t.data).flat()

    // if there is no data, then return (meta data is still available regardless)
    if (tweets.length === 1 && !tweets[0]) {
        return ''
    }

    // console.log(tweets[1].public_metrics)
    // console.log(tweets[1].referenced_tweets)

    const desiredDataStructure = tweets.map(tweet => ({
      [CSV_COLUMNS.Company]: company,
      [CSV_COLUMNS.Year]: year,
      [CSV_COLUMNS.Day]: getDateFromDateTime(tweet.created_at),
      [CSV_COLUMNS.Time]: getTimeFromDateTime(tweet.created_at),
      [CSV_COLUMNS.Sender]: tweet.id,
      [CSV_COLUMNS.Text]: `"${tweet.text}"`,
      [CSV_COLUMNS.Likes]: tweet.public_metrics ? tweet.public_metrics.like_count : '',
      [CSV_COLUMNS.Quotes]: tweet.public_metrics ? tweet.public_metrics.quote_count : '',
      [CSV_COLUMNS.Replies]: tweet.public_metrics ? tweet.public_metrics.reply_count : '',
      [CSV_COLUMNS.Retweets]: tweet.public_metrics ? tweet.public_metrics.retweet_count : '',
      [CSV_COLUMNS.IsRetweet]: tweet.referenced_tweets?.some(({public_metrics}) => public_metrics && public_metrics.type === 'retweet') ? 'Yes' : 'No',
      [CSV_COLUMNS.ReferencedTweets]: !tweet.referenced_tweets ? 'None' : tweet.referenced_tweets.map(({id, type}) => `${type} #${id}`).join(", "),
    }))
   
    csv_string = ''
  
    desiredDataStructure.forEach(tweet => csv_string += `${Object.values(tweet).join(', ')}\n`)
  
    return csv_string
  }


const parseTweetInformationAndWriteToFile = async (tweetInformation, outputFile) => {
    const csvString = formatCsvString(tweetInformation)

    await fs.appendFile(outputFile, csvString, () => null)
}

module.exports = parseTweetInformationAndWriteToFile
