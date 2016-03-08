({
    "baseUrl": "../../js",
    "include": ["html5shiv"],
    "out": "../../_release/js/polyfills_IE8.js",
    "paths": {
        "html5shiv": "../_resources/bower/html5shiv/dist/html5shiv"
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
        "CompilationLevel": "SIMPLE_OPTIMIZATIONS",
        "loggingLevel": "WARNING"
    },
    "removeCombined": false,
    "preserveLicenseComments": false,
    "logLevel": 0
})