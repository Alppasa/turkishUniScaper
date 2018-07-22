

async function getHtmlAsync() {
    try {
        result = await rp(options);
        searchWithCheerio(result);
    } catch (err) {
        console.error(err);
    }
}

function searchWithCheerio($) {
    $('.ProgramBaslikSatiri ').each(function (i, element) {
        getUrlAndAddToFoundElements(element);
    });
    distinct(urlsOfBachelorProgram);
}

