require(['jquery', 'push-notify'], function ($, pn) {
    console.debug('Loaded [push-notify-demo]');

    var senderId = '23616507958';

    $('#register-device').click(function () {
        if (pn.isAndroid()) {
            pn.registerGcm(senderId, 'gcmCallback');
        } else if (pn.isIos()) {
            pn.registerApns(true, true, true, 'apnsCallback');
        }
    });

    $('#unregister-device').click(function () {
        pn.unregister();
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

});

function gcmCallback(event, data) {
    require(['push-notify'], function (pn) {
        switch (event) {
            case pn.EVENT_MESSAGE:
                alert('Message from GCM');
                alert(JSON.stringify(data));
                break;
            case pn.EVENT_REGISTER:
                console.log(JSON.stringify(data));
                alert('Device registered');
                alert(JSON.stringify(data));
                break;
            case pn.EVENT_UNREGISTER:
                alert('Device unregistered');
                break;
            default:
                alert('Unexpected event [' + event + ']');
        }
    });
}

function onNotificationAPN(event) {
    if (event.alert) {
        navigator.notification.alert(event.alert);
    }

    /*
     if (event.sound) {
     var snd = new Media(event.sound);
     snd.play();
     }
     */

    if (event.badge) {
        window.plugins.pushNotification.setApplicationIconBadgeNumber(function (arg1) {
            console.log('XXX: set icon badge ok!');
            console.log(arg1);
        }, event.badge);
    }
}
