// use the 'push-notify' plugin
require(['jquery', 'push-notify'], function ($, pushNotify) {
    console.debug('Loaded [push-notify-demo]');

    // for Android/GCM change this to application's senderId
    var senderId = '23616507958';

    print('Initializing demo application...');
    registerDemo();
    print('See console log for detail');

    // event handlers to register/unregister & clear screen
    $('#register').click(function () {
        registerDemo();
    });

    $('#unregister').click(function () {
        pushNotify.unregister();
    });

    $('#clear').click(function () {
        $('#out').html('');
    });

    function registerDemo() {
        if (pushNotify.isAndroid()) {
            pushNotify.registerGcm(senderId, 'gcmCallback');
        } else if (pushNotify.isIos()) {
            pushNotify.registerApns('true', 'true', 'true', 'apnsCallback');
        } else {
            console.error('Cannot register from desktop');
        }
    }

    function print(msg) {
        var out = $('#out');
        out.html(msg + '<hr>' + out.html());
    }

});

// TODO: how to avoid global function?
function gcmCallback(event, data) {
    require(['push-notify'], function (pushNotify) {
        switch (event) {
            case pushNotify.EVENT_MESSAGE:
                var msg = JSON.stringify(data);
                console.log(msg);
                print(msg);
                break;
            case pushNotify.EVENT_REGISTER:
                var msg = JSON.stringify(data);
                console.log(msg);
                print(msg);
                break;
            case pushNotify.EVENT_UNREGISTER:
                var msg = 'Unregistered';
                print(msg);
                break;
            case pushNotify.EVENT_INFO:
                print(data['message']);
                break;
            case pushNotify.EVENT_ERROR:
                print(data['errorId']);
                break;
            default:
                var msg = 'Unexpected event [' + event + ']';
                print(msg);
        }

        function print(msg) {
            var out = $('#out');
            out.html(msg + '<hr>' + out.html());
        }
    });
}

// TODO: how to avoid global function?
function apnsCallback(event, event2, event3) {

    // TODO: tokenHandler not done! - it is the successHandler!!

    if (event.alert) {
        navigator.notification.alert(event.alert);
    }

    if (event.sound) {
        var snd = new Media(event.sound);
        snd.play();
    }

    if (event.badge) {
        pushNotification.setApplicationIconBadgeNumber(function(arg1) {
            console.log('Set icon badge ok');
            console.log(arg1);
        }, event.badge);
    }

}