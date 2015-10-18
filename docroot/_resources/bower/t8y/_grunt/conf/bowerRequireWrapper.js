module.exports = {
    target: {
        files : {
            '_resources/modified_sources/bootstrap/js/scrollspy.js' : ['_resources/bower/bootstrap/js/scrollspy.js']
        },
        modules: {
            'jquery' : 'jQuery'
        },
        exports: 'null',
        bower: false,
        banner: ''
    }
}