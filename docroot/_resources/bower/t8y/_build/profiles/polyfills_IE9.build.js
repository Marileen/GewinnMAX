({
    "baseUrl": "../../js",
    "include": ["css3-multi-column"],
    "out": "../../_release/js/polyfills_IE9.js",
    "paths": {
        "css3-multi-column": "../_resources/bower/CSS3MultiColumn/src/css3-multi-column"
    },
    "keepBuildDir": false,
    "optimize": "closure",
    "skipDirOptimize": false,
    "skipModuleInsertion": true,
    "closure": {
        "CompilerOptions": {
            "removeDeadCode": true,
            "removeUnusedLocalVars": true,
            "removeUnusedVars": true
        },
        "CompilationLevel": "WHITESPACE_ONLY",
        "loggingLevel": "WARNING"
    },
    "removeCombined": false,
    "preserveLicenseComments": false,
    "logLevel": 0
})