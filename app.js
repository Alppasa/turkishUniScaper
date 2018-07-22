const urlCollector = require('./src/controller/urlCollector');
const uniProgramInfoCollector = require('./src/controller/uniProgramInfoCollector');
const Json2csvParser = require('json2csv').Parser;
var uniPrograms = [];
const fields = ['degree', 'name', 'semesterAmount', 'url'];
const opts = { fields };
var csvFileCreator = require('csv-file-creator');
const fs = require('fs');


var main = async function () {
    await getInfoAsync('https://ebys.ege.edu.tr/ogrenci/ebp/organizasyon.aspx?kultur=en-US&Mod=1&Menu=0', 'Bachelor');
    await getInfoAsync('https://ebys.ege.edu.tr/ogrenci/ebp/organizasyon.aspx?kultur=en-US&Mod=2', 'Master');
    console.log(uniPrograms);
    console.log("done")
    convertToJson(uniPrograms);
}

async function getInfoAsync(url, degree) {
    var urls = await urlCollector.collect(url);
    var foundPrograms = await uniProgramInfoCollector.collect(urls, degree);
    uniPrograms = [...uniPrograms, ...foundPrograms];
    console.log('################################################ Done with ', degree, foundPrograms);
}

function convertToJson(foundPrograms) {
    var json = JSON.stringify(foundPrograms);
    console.log(json);
    exportToCsv(foundPrograms);
}

function exportToCsv(json) {
    try {
        const parser = new Json2csvParser({ fields });
        const csv = parser.parse(json);
        console.log(csv);
        exportCsv(csv);
    } catch (err) {
        console.error(err);
    }

}

async function exportCsv(csv) {
    await fs.writeFile('uniPrograms.csv', csv);
}

main();                                                      
