module.exports = function(grunt, project) {
    return function() {
        // register global templates
        var handlebars = require('grunt-compile-handlebars/node_modules/handlebars');
        var path = require('path');

        grunt.file.expand(project + 'tmpl*//***/*//*.handlebars').forEach(function (tmpl) {
            var name = 'master' + tmpl.substring(project + 'tmpl'.length, tmpl.lastIndexOf('.'));
            //TODO: change this to master
            handlebars.registerPartial(name, require(path.resolve(tmpl)));
        });
    }
}