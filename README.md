# Academic Twitter Scraper

## Scraping the Scraped

### System requirements

Node is required to run this project. https://nodejs.org/en/

### How to generate output

place the tweets that are desired to be converted into CSV into the `input_tweets` folder.

then run the following in the terminal
```
node .
```
the resulting CSV files will be placed in a folder in `output_csv` using the current time as a unique folder name (`results-YYYYMMDD-HHMMSS`). For each company, there will be a csv file generated.

### Testing

Tests require that dependencies be installed. Run `npm i` to install dependencies.

to run tests, run the folloing in the terminal
```
npm test
```