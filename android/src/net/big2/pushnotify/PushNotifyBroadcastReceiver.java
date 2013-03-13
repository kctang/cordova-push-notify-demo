package net.big2.pushnotify;

import android.content.Context;
import com.google.android.gcm.GCMBroadcastReceiver;

public class PushNotifyBroadcastReceiver extends GCMBroadcastReceiver {
    @Override
    protected String getGCMIntentServiceClassName(Context context) {
        // override with custom intent service name
        return PushNotifyIntentService.class.getName();
    }
}
