/**
 * Define a module to communicate with PushNotify plugin.
 */
define([
    // TODO: ideally, cordova is a requirejs dependency
    // 'cordova'
], function (cordova) {

    // specified in cordova's config.xml
    var PLUGIN_NAME = 'PushNotify';

    var PushNotify = function () {
        this.EVENT_MESSAGE = 'message';
        this.EVENT_ERROR = 'error';
        this.EVENT_REGISTER = 'register';
        this.EVENT_UNREGISTER = 'unregister';

        var nativeSuccess = function (msg) {
            console.debug('Successful native call [' + msg + ']');
        };

        var nativeError = function (msg) {
            console.error('Error occurred while executing native call [' + msg + ']');
        };

        /**
         * Register current device to a project (senderId) on Google Cloud Messaging (GCM). Events for this device will be sent to the associated callback function (gcmCallback).
         *
         * Details on how to generate sender ID - http://developer.android.com/guide/google/gcm/gs.html.
         *
         * This will only work for Android devices.
         *
         * @param {String} senderId Sender ID from Google API project.
         * @param {String} gcmCallback Callback function on GCM events. Valid events are 'registered' and 'message'.
         */
        this.registerGcm = function (senderId, gcmCallback) {
            if (typeof gcmCallback !== 'string') {
                // TODO: can this be an actual function? for now, no.
                // avoid common mistake of passing a function
                throw 'Parameter must be a string value of function name';
            }
            window.cordova.exec(nativeSuccess, nativeError, PLUGIN_NAME, 'register', [{
                'senderId': senderId, 'gcmCallback': gcmCallback
            }]);
        };

        /**
         * Register current device to Apple Push Notification Service (APNS). Event for this device will be sent to the associated callback function (apnsCallback).
         *
         * TODO: figure out how these work...
         *
         * This will only work for iOS devices.
         *
         * @param badge
         * @param sound
         * @param alert
         * @param apnsCallback
         */
        this.registerApns = function (badge, sound, alert, apnsCallback) {
            if (typeof apnsCallback !== 'string') {
                // TODO: can this be an actual function? for now, no.
                // avoid common mistake of passing a function
                throw 'Parameter must be a string value of function name';
            }
            window.cordova.exec(nativeSuccess, nativeError, PLUGIN_NAME, 'register', [{
                'badge': badge, 'sound': sound, 'alert': alert, 'apnsCallback': apnsCallback
            }]);
        }

        /**
         * Unregister current device from the appropriate push notification service (GCM or APNS).
         */
        this.unregister = function () {
            window.cordova.exec(nativeSuccess, nativeError, PLUGIN_NAME, 'unregister', []);
        }

        /**
         * TODO: ...
         *
         * This will only work for iOS devices.
         *
         * @param badge
         */
        this.setApplicationIconBadgeNumber = function (badge) {
            window.cordova.exec(nativeSuccess, nativeError, PLUGIN_NAME, 'setApplicationIconBadgeNumber', [
                { 'badge': badge }
            ]);
        }

        this.isAndroid = function() {
            // TODO: refactor and hide this in register methods - just log debug if wrong platform
            return window.device.platform === 'Android';
        }

        this.isIos = function() {
            // TODO: refactor and hide this in register methods - just log debug if wrong platform
            return window.device.platform === 'iOS';
        }

    }

    return new PushNotify();
});