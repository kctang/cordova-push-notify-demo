/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);

        demoPushNotification();

        function demoPushNotification() {
            var SENDER_ID = '23616507958';

            var pushNotification = window.plugins.pushNotification;

            if (device.platform == 'android' || device.platform == 'Android') {
                alert('call android');
                pushNotification.register(function successHandler(result) {
                    alert('Registered!');
                    alert(result);

                }, function errorHandler(error) {
                    alert('Not good! :-(');
                    alert(error);

                },
                    {"senderID":SENDER_ID,"ecb":"onNotificationGCM"}
                );
            } else {
                alert('Only Android for now!');
//                pushNotification.register(tokenHandler, errorHandler {"badge":"true","sound":"true","alert":"true","ecb":"onNotificationAPN"});
            }
        }
    }
};

function onNotificationGCM(e) {
    switch (e.event) {
        case 'registered':
            if (e.regid.length > 0) {
                // Your GCM push server needs to know the regID before it can push to this device
                // here is where you might want to send it the regID for later use.
                alert('registration id = ' + e.regid);
            }
            break;

        case 'message':
            // if this flag is set, this notification happened while we were in the foreground.
            // you might want to play a sound to get the user's attention, throw up a dialog, etc.
            if (e.foreground) {
                $('body').append('<li>--INLINE NOTIFICATION--' + '</li>');

                // if the notification contains a soundname, play it.
                /*
                 var my_media = new Media("/android_asset/www/" + e.soundname);
                 my_media.play();
                 */
            }
            else    // otherwise we were launched because the user touched a notification in the notification tray.
                $("#app-status-ul").append('<li>--BACKGROUND NOTIFICATION--' + '</li>');

            $("#app-status-ul").append('<li>MESSAGE -> MSG: ' + e.payload.message + '</li>');
            $("#app-status-ul").append('<li>MESSAGE -> MSGCNT: ' + e.payload.msgcnt + '</li>');
            break;

        case 'error':
            alert('GCM error = ' + e.msg);
            break;

        default:
            alert('An unknown GCM event has occurred');
            break;
    }
}
