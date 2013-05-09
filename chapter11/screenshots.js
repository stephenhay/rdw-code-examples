var casper = require('casper').create();

casper.start();

var baseUrl = 'http://localhost:8085'; // <- Should be the host Dexy names when running "dexy serve"
var breakpoints = [400, 600, 900];

casper.open(baseUrl).then(function () {
    breakpoints.forEach(function(breakpoint) {
        casper.viewport(breakpoint, 800).capture('images/' + breakpoint + '.png', {
        top: 0,
        left: 0,
        width: breakpoint,
        height: casper.evaluate(function(){ return document.body.scrollHeight; })
        });
    });
});

casper.then(function() {
    this.captureSelector('images/h1.png', 'h1');
});

casper.run();
