const fs = require('fs');
const path = require('path');

const {CSV_COLUMNS} = require('../../config')

const initialCSV = `${Object.values(CSV_COLUMNS).join(', ')}\n\n`

const createCSVFileIfNoneExistent = (file) => {
    if (!fs.existsSync(file)) {
        fs.writeFile(file, initialCSV, (err) => {
            if (err) {
                console.log(`error creating file ${file}`, err)
            }
        })
    }  
}

const getCompanyAndDateFromFile = (file) => {
    const fileName = path.basename(file, path.extname(file))

    const [company, year] = fileName.split("_")

    return {
        company,
        year
    }
}

module.exports = {
    createCSVFileIfNoneExistent,
    getCompanyAndDateFromFile
}