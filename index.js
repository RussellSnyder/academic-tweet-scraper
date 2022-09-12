'use strict';

const {promises: fs} = require('fs');

const TWEETS_FOLDER = './tweets'
const CSV_FOLDER = './csv'

const CSV_COLUMNS = {
  DayTime: 'DayTime',
  Sender: 'Sender/Account',
  Text: 'Tweet Text',
  Likes: 'Likes',
  Quotes: 'Quotes',
  Replies: 'Replies',
  Retweets: 'Retweets',
  IsRetweet: 'Is a Retweet',
  MentionsAnotherUser: 'Mentions another user?',
}

const parseResponseBodyPrintout = (testObject) => {
  const printout = Object.keys(testObject)[0]
  const trimmed = printout.substring('Response Body Printout= ('.length, printout.length - 1)

  return JSON.parse(trimmed)
}

const getCurrentDateString = () => {
  let date_ob = new Date();

  let day = ("0" + date_ob.getDate()).slice(-2);

  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

  let year = date_ob.getFullYear();

  let hour = date_ob.getHours();

  let minute = date_ob.getMinutes();

  let second = date_ob.getSeconds();

  return `${year}${month}${day}-${hour}${minute}${second}`
}

const processTweet = async (filePath) => {
  const tweet = await fs.readFile(filePath, 'utf8')
  const json = JSON.parse(tweet)

  const tests = json.results[0].tests

  const processed = parseResponseBodyPrintout(tests).data

  return processed
}

const formatForCsv = (tweets) => {
  // Columns
  // DayTime, Sender/Account, Tweet Text, Likes, Quotes, Replies, Retweets, Is a Retweet, Mentions another user?
  // {
  //   id: '555460711745601537',
  //   public_metrics: { retweet_count: 0, reply_count: 0, like_count: 0, quote_count: 0 },
  //   created_at: '2015-01-14T20:25:28.000Z',
  //   referenced_tweets: [ { type: 'replied_to', id: '555106801851858945' } ],
  //   text: '@AbouChakalaka Sorry for any inconvenience. Pls email wmcaresonline@wm.com (Subject: Tweet) w/your acct &amp; contact info, so we may assist.',
  //   conversation_id: '555106801851858945'
  // }
  const desiredDataStructure = tweets.map(tweet => ({
    [CSV_COLUMNS.DayTime]: tweet.created_at,
    [CSV_COLUMNS.Sender]: tweet.id,
    [CSV_COLUMNS.Text]: `"${tweet.text}"`,
    [CSV_COLUMNS.Likes]: tweet.public_metrics ? tweet.public_metrics.like_count : '',
    [CSV_COLUMNS.Quotes]: tweet.public_metrics ? tweet.public_metrics.quote_count : '',
    [CSV_COLUMNS.Replies]: tweet.public_metrics ? tweet.public_metrics.reply_count : '',
    [CSV_COLUMNS.Retweets]: tweet.public_metrics ? tweet.public_metrics.retweet_count : '',
    [CSV_COLUMNS.IsRetweet]: !tweet.referenced_tweets || !tweet.referenced_tweets.length ? 'No' : `referenced tweets: ${tweet.referenced_tweets.map(tweet => tweet.type).join(", ")}`,
  }))

  let csv_string = 'For Dave With Love \n\n'

  csv_string += `${Object.values(CSV_COLUMNS).join(', ')}\n\n`

  // console.log(desiredDataStructure)
  desiredDataStructure.forEach(tweet => csv_string += `${Object.values(tweet).join(', ')}\n`)

  return csv_string
}
const processTweets = async () => {
  const tweetFolderContents = await fs.readdir(TWEETS_FOLDER)
  const filesToProcess = tweetFolderContents.filter(name => name !== '.gitkeep')

  const processedTweetsArray = await Promise.all(filesToProcess.map(async (file) => {
    return await processTweet(`${TWEETS_FOLDER}/${file}`)
  }));

  const processedTweets = processedTweetsArray[0]
  const csvData = formatForCsv(processedTweets)

  try {
    const filePath = `${CSV_FOLDER}/${getCurrentDateString()}.csv`
    fs.writeFile(filePath, csvData, 'utf8')
    console.log('results saved to ', filePath)
  } catch(e) {
    console.error(e)
  }

};


processTweets()