const TWEETS_FOLDER = './input_tweets'
const CSV_FOLDER = './output_csv'

const CSV_COLUMNS = {
  Company: 'Company',
  Year: 'Year',
  Date: 'Date',
  Time: 'Time',
  Sender: 'Sender/Account',
  Text: 'Tweet Text',
  Likes: 'Likes',
  Quotes: 'Quotes',
  Replies: 'Replies',
  Retweets: 'Retweets',
  IsRetweet: 'Is a Retweet',
  ReferencedTweets: 'ReferencedTweets',
}

module.exports = {
    TWEETS_FOLDER,
    CSV_FOLDER,
    CSV_COLUMNS
}