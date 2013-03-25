package net.big2.pushnotify;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import com.google.android.gcm.GCMBaseIntentService;

import java.util.Map;
import java.util.TreeMap;

import static net.big2.pushnotify.PushNotifyPlugin.sendToCordova;

public class PushNotifyIntentService extends GCMBaseIntentService {
    public static final String TAG = PushNotifyIntentService.class.getName();

    public static final String EVENT_MESSAGE = "message";
    public static final String EVENT_REGISTER = "register";
    public static final String EVENT_UNREGISTER = "unregister";
    public static final String EVENT_ERROR = "error";
    public static final String EVENT_INFO = "info";

    @Override
    protected void onMessage(Context context, Intent intent) {
        Log.d(TAG, "Message received [" + String.valueOf(intent));

        Map<String, Object> dataMap = extrasToMap(intent.getExtras());
        sendToCordova(EVENT_MESSAGE, dataMap);
    }

    @Override
    protected void onError(Context context, String errorId) {
        Log.e(TAG, "Error received [" + errorId + "]");
        sendToCordova(EVENT_ERROR, "errorId", errorId);
    }

    @Override
    protected void onRegistered(Context context, String regId) {
        Log.d(TAG, "Registered [" + regId + "]");
        sendToCordova(EVENT_REGISTER, "regId", regId);
    }

    @Override
    protected void onUnregistered(Context context, String regId) {
        Log.d(TAG, "Unregistered [" + regId + "]");

        if (regId != null && regId.length() > 0) {
            sendToCordova(EVENT_UNREGISTER, "regId", regId);
        }
    }

    private Map<String, Object> extrasToMap(Bundle extras) {
        Map<String, Object> dataMap = new TreeMap<String, Object>();
        for (String key : extras.keySet()) {
            dataMap.put(key, extras.get(key));
        }

        return dataMap;
    }

}
