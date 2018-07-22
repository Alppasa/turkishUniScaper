const cheerio = require('cheerio');

var programNameAndDegreeCollector = {}

programNameAndDegreeCollector.getName = function (html) {
    var header = searchHtmlForName(html);
    var name = header.split(" - ")[1];
    name = name.replace(/\s/g, '');
    return name;
};

function searchHtmlForName($) {
    var header = '';
    $('.ProgramBaslikSatiri ').each(function (i, element) {
        header = element.children[0].data.replace(/\r?\n|\r/);
    });
    return header;
}
programNameAndDegreeCollector.getSemesterAmount = function ($) {
    var count = $('div[id="ltlMufredat"]').children().length;
    return count;
};

module.exports = programNameAndDegreeCollector;
