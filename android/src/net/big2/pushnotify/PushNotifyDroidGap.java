package net.big2.pushnotify;

import android.os.Bundle;
import org.apache.cordova.Config;
import org.apache.cordova.DroidGap;

// TODO: review & refactor!
public class PushNotifyDroidGap extends DroidGap {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // Set by <content src="index.html" /> in config.xml
        super.loadUrl(Config.getStartUrl());
        //super.loadUrl("file:///android_asset/www/index.html")

        // TODO: call handlePush
    }
}
