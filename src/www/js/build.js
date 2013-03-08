({
    baseUrl: "js/",

    paths: {
        'jquery': 'empty:',
        'jskit': '../components/jskit/jskit',
        'jskit-jquery': '../components/jskit-jquery/jskit-jquery',
        'underscore': '../components/underscore/underscore'
    },

    shim: {
        'underscore': {
            'exports': '_'
        }

    },

    // --- build specific configuration

    appDir: "../",
    dir: "../../../android/assets/www",

//    optimize:"none",
    optimize: "uglify",

    optimizeCss: "standard",
    removeCombined: true,
    keepBuildDir: false,
    preserveLicenseComments: false,

    fileExclusionRegExp: /^\..*|app\.build\.js|component.json|sinon|qunit|test/,

    modules: [
        {
            name: "main"
        }
    ]

})