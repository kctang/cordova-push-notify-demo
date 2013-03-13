require(['jquery', 'jskit'], function () {
    console.debug('Loaded [pnd-demo]');

    var notify = window.plugins.pushNotification;
    var senderId = '23616507958';

    $('#register-device').click(function () {
        register();
    });

    $('#unregister-device').click(function () {
        unregister();
    });

    $('#check-status').click(function () {
        console.log('stat');
    });

    $('#notify-now').click(function () {
        console.log('now');
    });

    $('#notify-later').click(function () {
        console.log('later');
    });

/*
    document.addEventListener("backbutton", function (e) {
        if ($("#home").length > 0) {
            e.preventDefault();
            notify.unregister();
            navigator.app.exitApp();
        } else {
            navigator.app.backHistory();
        }
    }, false);
*/

    function register() {
        if (window.device.platform == 'android' || window.device.platform == 'Android') {
            notify.register(function (result) {
                    // registered successfully
                    console.log(result);
                }, function (error) {
                    // error handler
                    console.log(error);
                },
                {"senderID": senderId, "ecb": "onNotificationGCM"}
            );
        } else {
            console.error('Only support Android for now');
        }
    }

    function unregister() {
        notify.unregister(function (result) {
            console.log(result);
        }, function (error) {
            console.log(error);
        });
    }

});


function onNotificationGCM(e) {
    console.log(e);

    switch (e.event) {
        case 'registered':
            if (e.regid.length > 0) {
                // Your GCM push server needs to know the regID before it can push to this device
                // here is where you might want to send it the regID for later use.
                console.log('Registered device [' + e.regid + ']');
            }
            break;

        case 'message':
            // if this flag is set, this notification happened while we were in the foreground.
            // you might want to play a sound to get the user's attention, throw up a dialog, etc.
            if (e.foreground) {
                console.log('Foreground notification');
            } else {
                console.log('Background notification');
            }
            console.log(e.payload.message);
            console.log(e.payload.msgcnt);
            break;

        case 'error':
            console.log(e.msg);
            break;

        default:
            console.log('Unknown push notification event occurred');
            break;
    }
}