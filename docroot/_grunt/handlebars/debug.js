var handlebars = require('../../node_modules/grunt-compile-handlebars/node_modules/handlebars');

module.exports = function(optionalValue) {
    var context = Object.create(this);

    console.log("Current Context");
    console.log("====================");
    console.log(this);

    if (optionalValue) {
        console.log("Value");
        console.log("====================");
        console.log(optionalValue);
    }

    return handlebars.registerHelper('debug', context);
};