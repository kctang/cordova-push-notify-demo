require.config({
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
    }
});

require([
    'jquery'
], function ($) {

    var onDeviceReady = function () {
        alert("REQUIREJS!");
        console.log('Ok!');
        $(body).append('Okie!');
    }

    document.addEventListener('deviceready', onDeviceReady, false);

});