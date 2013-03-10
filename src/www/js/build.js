({
    baseUrl: "js/",

    paths: {
        'jquery': 'empty:',
        'jquery-mobile': '../lib/jquery.mobile-1.3.0/jquery.mobile-1.3.0',
        'jskit': '../components/jskit/jskit',
        'jskit-jquery': '../components/jskit-jquery/jskit-jquery',
        'underscore': '../components/underscore/underscore',
        'cordova': '../lib/cordova-2.5.0',
        'text': '../components/requirejs-text/text',
        'handlebars': '../components/handlebars.js/dist/handlebars'
    },

    shim: {
        'underscore': {
            'exports': '_'
        },
        'handlebars': {
            'exports': 'Handlebars'
        },
        'jquery-mobile': ['jquery-mobile-init']
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
            name: "app"
        }
    ],

    // -- patches

    // https://github.com/jrburke/r.js/issues/170#issuecomment-5854459
    onBuildRead: function (moduleName, path, contents) {
        if (path.indexOf('cordova-2.5.0.js') === -1) {
            return contents;
        } else {
            return contents.replace(/define\s*\(/g, 'CORDOVADEFINE(');
        }
    },
    onBuildWrite: function (moduleName, path, contents) {
        if (path.indexOf('cordova-2.5.0.js') === -1) {
            return contents;
        } else {
            return contents.replace(/CORDOVADEFINE\(/g, 'define(');
        }
    }

})