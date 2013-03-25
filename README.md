# Cordova Push Notify Plugin Demo

Application to demonstrate the use of native push notification on both Android & iOS devices through a Cordova push
notification plugin. The plugin is a RequireJS compatible module.

The demo application uses a structure that I use for Cordova applications. It features:

- Shared www directory to store application files (platform independent)
- A directory for each target platform's project (Android and iOS)
- RequireJS to manage JavaScript modules
- Build script that optimize files for production use in Android/iOS
- Bower to manage JavaScript dependencies
- Handlebars.js for client-side templating
- JQuery Mobile with proper lifecycle initialization for Cordova (not sure if this is a good idea)

## Concepts

Push notifications for Android uses Google Cloud Messaging (GCM) while iOS uses Apple Push Notification Service (APNS).
These services that must be configured per application to use push notifications.

See links below this page to learn more about these.

## Pre-requisites

* Mac OS/Linux
  * XCode requires MacOS
  * Android project work with Windows with minimal tweaks (I just did not test the build scripts)
* Android SDK to build Android project
* XCode to build iOS project
* Bower to download www dependencies

---

## Building

### Build - www (All Platforms)

Download dependencies for the JavaScript application by executing `bower install` in `src/www`.

    cd src/www
    bower install

This will download all the necessary dependencies to src/www/components directory. This is only required for the first
build and after changes the `component.json` file.

Optimize `src/www` to `android/assets/www` and `ios/www` with `src/build.sh`.

    cd src
    ./build.sh

This will run RequireJS's optimizer against `src/www` and copy the optimized files to the appropriate optimized www
directory for Android (`android/assets/www`) & iOS (`ios/www`). Note that both of these optimized www directories are
considered build output directories (contents will be deleted on each build) and should be used to update `www` source
codes.

Each time contents in `src/www` changes, it needs to go through this process before building the Android/iOS application.

// TODO: automate building of `src/www` with a grunt task

### Build - Android

* Get a senderId from Google Cloud Messaging (GCM) to send push notifications to Android devices.
* Change `var senderId` to your application's senderId in `src/www/js/m/push-notify-demo.js`.
* Rebuild `www` files.
* Build the Android project in the `android` directory & deploy.
    * You can use your favourite IDE with Android suport or Cordova's command line tools.
* To send messages, refer to [Test Environment](https://github.com/phonegap-build/PushPlugin#test-environment) section of phongap-build/PushPlugin.

### iOS

* Get a provisioning profile that includes Apple Push Notification Service (APNS) support to send push notifications to iOS devices.
* To setup APNS, follow the instructions [phonegap-build/PushPlugin](http://github.com/phonegap-build/PushPlugin) and [Ray Wenderlich blog's tutorial](http://www.raywenderlich.com/3443/apple-push-notification-services-tutorial-part-12).
* Build `www` files.
* Build the XCode project with the provisioning profile that supports APNS.
* To send messages, refer to [Test Environment](https://github.com/phonegap-build/PushPlugin#test-environment) section of phongap-build/PushPlugin.

---

## JavaScript Files



### push-notify-demo.js

This is the JavaScript application/module that interacts with the push notification plugin. Check this file out to see
how to interact with the plugin via JavaScript.

### src/www/lib/push-notify.js

This is the push notification plugin's JavaScript code as a RequireJS module. Unless you are trying to customize the
plugin (or fork it to fix bugs! :D), you should not need to edit this file. Just use it as a RequireJS dependency.

### src/www/js/app.js

This is the main RequireJS module loaded from `src/www/index.html`. It is somewhat complicated due to the lifecycle
management of JQuery Mobile (JQM) used in this demo. You do not really need any of these to use the `push-notify`
module in your own application.

### src/www/js/build.js

This is the RequireJS optimization tool's build file. It is referenced by `src/build.sh`.

## Android Files

### net.big2.pushnotify

This package contains the plugin specific Java/Android code.

### net.big2.demo.pnd

This package contains the main Activity that extends from PushNotifyDroid. (Not really needed - need to clean up).

### android/res/xml/config.xml

Android projects need to edit this file to include the plugin.

    <plugin name="PushNotify" value="net.big2.pushnotify.PushNotifyPlugin" onload="true"/>

`onload="true"` will initialize the plugin when the application is loaded so that it can receive messages immediately.

### android/AndroidManifest.xml

Registers the required permissions, intent service & broadcast receiver that interacts with the plugin.

### android/libs/gcm.jar and android-support-v13.jar

These are the JAR dependencies required for the plugin to work.

## iOS Files

The iOS code can be found here:

    ios/PushNotifyDemo/Plugins/*
    ios/PushNotifyDemo/config.xml

There are plans to enhance this but at the moment, it is very similar to [phonegap-build/PushPlugin](https://github.com/phonegap-build/PushPlugin).

## Frequently Asked Questions (FAQs)

Q: ...

A: ...


## Links

[phonegap-build/PushPlugin](https://github.com/phonegap-build/PushPlugin)

[Android Push Notifications With PhoneGap](http://www.adobe.com/devnet/phonegap/articles/android-push-notifications-with-phonegap.html)

[Local and Push Notification Programming Guide](http://developer.apple.com/library/mac/#documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/ApplePushService/ApplePushService.html) (Apple)

[Google Cloud Messaging for Android](http://developer.android.com/guide/google/gcm/index.html) (Android)

[Apple Push Notification Services Tutorial: Part 1/2](http://www.raywenderlich.com/3443/apple-push-notification-services-tutorial-part-12)

[Apple Push Notification Services Tutorial: Part 2/2](http://www.raywenderlich.com/3525/apple-push-notification-services-tutorial-part-2)


## Acknowledgments

A huge thanks to Bob Easterday's (bobeast) PushPlugin & the culmulative work of others that made push notifications on
Cordova possible.
