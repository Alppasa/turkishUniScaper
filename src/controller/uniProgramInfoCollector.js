var rp = require('request-promise');
var nameAndDegreeCollector = require('./programNameAndDegreeCollector');
const cheerio = require('cheerio');
uniPrograms = [];

var uniProgramInfoCollector = {}
uniProgramInfoCollector.collect = async function (urls, degree) {
    console.time("dbsave");
    await Promise.all(urls.map( url => {
        return getHtmlAsync(url, degree)
        .catch(err => {
            console.error('##########################' + url + err);
        });
    }));
    console.timeEnd("dbsave");
    return uniPrograms;
};


var options = {
    transform: function (body) {
        return cheerio.load(body);
    }
};

async function getHtmlAsync(url, degree) {
    try {
        options.uri = url;
        var html = await rp(options);
        var name = nameAndDegreeCollector.getName(html);
        var semesterAmount = nameAndDegreeCollector.getSemesterAmount(html);
        addUniProgram(degree, name, semesterAmount, url);
    } catch (err) {
        console.error(err);
    }
};

function addUniProgram(degree, name, semesterAmount, url) {
    var uniProgram = {};
    uniProgram.degree = degree;
    uniProgram.name = name;
    uniProgram.semesterAmount = semesterAmount;
    uniProgram.url = url;
    console.log(uniProgram);
    uniPrograms.push(uniProgram);
}

module.exports = uniProgramInfoCollector;

