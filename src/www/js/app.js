require.config({
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
    }
});

// Configure modules.
var modules = {
    'deviceReady': [
        'm/page',
        'm/main-swipe'
    ],
    'jqmReady': [
        // pageInit should not be here
        'm/demo'
    ]
}

// WARNING: Tweaking these code affects lifecycle of cordova & jquery-mobile (complex).
require(['jskit', 'jquery-mobile', 'text'], function (jskit, jqm) {
        // --- jqm loaded (autoInitializePage=false)
        patchJqm();

        var onJqmReadyToken = jskit.subscribe('onJqmReady', function () {
            require(modules.jqmReady);

            // TODO: support subscribe once
            jskit.unsubscribe(onJqmReadyToken);
        });

        var jqmPagesInitialized = false;
        var onHtmlReadyToken = jskit.subscribe('onHtmlReady', function () {
            jqmPagesInitialized = true;
            processHtmlReady();

            // TODO: support subscribe once
            jskit.unsubscribe(onHtmlReadyToken);
        });

        jskit.subscribe('onDeviceReady', function () {
            // delay 1 second before auto jqm init
            setTimeout(function () {
                if (jqmPagesInitialized === false) {
                    jskit.unsubscribe(onHtmlReadyToken);
                    console.warn('Call "jskit.publish(\'onHtmlReady\')" from modules to optimize performance', modules.deviceReady);
                    processHtmlReady();
                }
            }, 1000);

            // load module(s) before jqm pages are initialized
            // these modules should publish 'onHtmlReady' when HTML is ready to be initialized by jqm
            require(modules.deviceReady);
        });

        // make sure onDeviceReady is called for both desktop & mobile
        if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
            document.addEventListener("deviceready", function () {
                jskit.publish('onDeviceReady');
            }, false);
        } else {
            // browser is always ready
            jskit.publish('onDeviceReady');
        }

        function processHtmlReady() {
            jqm.initializePage();
            jskit.publish('onJqmReady');
        }

        function patchJqm() {
            // Monkey patch for jQM bug
            // https://github.com/jquery/jquery-mobile/issues/5284
            $.mobile._handleHashChange = (function (old) {
                return function () {
                    if (undefined === $.mobile.pageContainer) {
                        return;
                    }
                    return old.apply(this, arguments);
                };
            }($.mobile._handleHashChange));

        }
    }
);