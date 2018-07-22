var rp = require('request-promise');

var htmlCollector = {}
htmlCollector.collect() = async function (url) {
    url = this.url;
    await getHtmlAsync();
    return allUrls;
};

async function getHtmlAsync() {
    try {
        result = await rp(options);
        return result;
    } catch (err) {
        console.error(err);
    }
}

module.exports = htmlCollector;
