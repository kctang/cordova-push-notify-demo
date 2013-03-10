/**
 * This module is loaded before jquery-mobile so we ca bind to mobileinit.
 * - Prevents automatic iniitalization of pages (we want to control this from our application)
 */
require([ 'jquery' ], function ($) {
        console.debug('Loaded [jquery-mobile-init]');

        $(document).bind("mobileinit", function () {
            console.debug('Execute [mobileinit]');

            $.mobile.autoInitializePage = false;
        });
    }
);