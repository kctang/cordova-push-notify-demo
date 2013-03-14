/**
 * Define a module to communicate with PushNotify plugin.
 */
define(['cordova'], function (cordova) {
    var PLUGIN_NAME = 'PushNotify';

    var PushNotify = function () {
        /**
         *
         * @param {Function} successCallback Successful execution callback.
         * @param {Function} errorCallback Error callback.
         * @param {JSON Object} options JSON object with 'senderId' and 'ecb' is expected. TODO: more description!
         *
         */
        this.register = function (successCallback, errorCallback, options) {
            cordova.exec(successCallback, errorCallback, PLUGIN_NAME, 'register', [options]);
        }

        this.unregister = function (sucessCallback, errorCallback) {
            cordova.exec(successCallback, errorCallback, PLUGIN_NAME, 'unregister', []);
        }

        this.setApplicationIconBadgeNumber = function (successCallback, errorCallback, badge) {
            cordova.exec(successCallback, errorCallback, PLUGIN_NAME, 'setApplicationIconBadgeNumber', [
                { 'badge': badge}
            ]);
        }
    }

    return new PushNotify();

});