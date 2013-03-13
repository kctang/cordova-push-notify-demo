package net.big2.pushnotify;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import com.google.android.gcm.GCMBaseIntentService;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;
import java.util.TreeMap;
import java.util.logging.Level;
import java.util.logging.Logger;

import static net.big2.pushnotify.PushNotifyPlugin.showToast;

public class PushNotifyIntentService extends GCMBaseIntentService {
    private Logger log = Logger.getLogger(PushNotifyIntentService.class.getName());

    @Override
    protected void onMessage(Context context, Intent intent) {
        log.fine("Message received [" + String.valueOf(intent));

        Map<String, Object> dataMap = extrasToMap(intent.getExtras());
        sendToCordova(dataMap);
    }

    @Override
    protected void onError(Context context, String errorId) {
        log.severe("Error received [" + errorId + "]");
    }

    @Override
    protected void onRegistered(Context context, String regId) {
        log.fine("Registered [" + regId + "]");
        sendToCordova("regId", regId);
    }

    @Override
    protected void onUnregistered(Context context, String regId) {
        log.fine("Unregistered [" + regId + "]");
        sendToCordova("regId", regId);
    }

    private void sendToCordova(Map<String, Object> dataMap) {
        try {
            JSONObject json = new JSONObject();
            for (Map.Entry<String, Object> entry : dataMap.entrySet()) {
                json.put(entry.getKey(), entry.getValue());
            }
            PushNotifyPlugin.sendJavaScript(json);
        } catch (JSONException e) {
            showToast("Error processing GCM message");
            log.log(Level.SEVERE, "Error processing GCM message", e);
        }
    }

    private void sendToCordova(String key, String value) {
        Map<String, Object> dataMap = new HashMap<String, Object>();
        dataMap.put(key, value);
        sendToCordova(dataMap);
    }

    private Map<String, Object> extrasToMap(Bundle extras) {
        Map<String, Object> dataMap = new TreeMap<String, Object>();
        for (String key : extras.keySet()) {
            dataMap.put(key, extras.get(key));
        }

        return dataMap;
    }

}
