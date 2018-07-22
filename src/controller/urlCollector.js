const rp = require('request-promise');
const cheerio = require('cheerio');
const mainUrl = 'https://ebys.ege.edu.tr/ogrenci/ebp/';

foundUrls = [];
var urlsOfMasterProgram = [];

var urlCollector = {}
urlCollector.collect = async function (url) {
    await getHtmlAsync(url);
    return foundUrls;
};

var options = {
    transform: function (body) {
        return cheerio.load(body);
    }
};

async function getHtmlAsync(url) {
    try {
        options.uri = url;
        result = await rp(options);
        searchWithCheerio(result);
    } catch (err) {
        console.error(err);
    }
}

function searchWithCheerio($) {
    $('.BirimNode').each(function (i, element) {
        getUrlAndAddToFoundElements(element);
    });
}

function getUrlAndAddToFoundElements(foundElement) {
    var foundUrl = foundElement.attribs.href;
    if (foundUrl !== "javascript:") {
        foundUrls.push(addMainUrlPart(foundUrl));
        foundUrls = unique(foundUrls);
    }

}

function addMainUrlPart(foundUniProgramUrl) {
    return mainUrl + foundUniProgramUrl;
}

function unique(array) {
    return array.filter(function (el, index, arr) {
        return index === arr.indexOf(el);
    });
}

module.exports = urlCollector;

