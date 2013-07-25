var casper = require('casper').create();

casper.start();

var baseUrl = "http://localhost:8085"; 

var breakpoints = [400, 600, 900, 1200];

var links = [
    '', // an empty string means the home page
    '/login/' // if you have more levels it would be something like /chapter1/errata/
];

var screenshotFolder = 'screenshots';

function nameFile(link, breakpoint) {
    if (link == '') {
        var name = 'home';
    } else {
        var name = link;
    }
    return screenshotFolder + '/' + name.replace(/\//g,'_') + breakpoint + '.png';
}

links.forEach(function(link) {
    casper.thenOpen(baseUrl + link, function () {
        breakpoints.forEach(function(breakpoint) {
            casper.viewport(breakpoint, 800). capture(nameFile(link, breakpoint), {
            top: 0,
            left: 0,
            width: breakpoint,
            height: casper.evaluate(function(){ return document.body.scrollHeight; })
            });
        });
    });
});

casper.run();
