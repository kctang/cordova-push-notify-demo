package net.big2.pushnotify;


import android.app.Activity;
import android.content.Context;
import android.util.Log;
import android.widget.Toast;
import com.google.android.gcm.GCMRegistrar;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.api.CallbackContext;
import org.apache.cordova.api.CordovaInterface;
import org.apache.cordova.api.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import static org.apache.cordova.api.LOG.d;
import static org.apache.cordova.api.LOG.e;


public class PushNotifyPlugin extends CordovaPlugin {
    public static final String TAG = PushNotifyPlugin.class.getName();

    public static final String ACTION_REGISTER = "register";
    public static final String ACTION_UNREGISTER = "unregister";

    public static final String DATA_SENDER_ID = "senderId";
    public static final String DATA_GCM_CALLBACK = "gcmCallback";

    private static Activity activity;
    private static CordovaWebView staticWebView;
    private static String gcmCallback;
    private static boolean foreground; // indicates if the activity is in foreground

    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);
        activity = cordova.getActivity();
        staticWebView = webView;
        foreground = true;
    }

    @Override
    public boolean execute(String action, JSONArray data, CallbackContext callbackContext) throws JSONException {
        boolean success = true;

        Context context = cordova.getActivity().getApplicationContext();


        if (ACTION_REGISTER.equals(action)) {
            try {
                // setup static fields for sendJavaScript method
                // is there a better way of doing this?
                gcmCallback = data.getJSONObject(0).getString(DATA_GCM_CALLBACK);

                String senderId = data.getJSONObject(0).getString(DATA_SENDER_ID);
                if (!GCMRegistrar.isRegistered(context)) {
                    GCMRegistrar.register(context, senderId);
                } else {
                    d(TAG, "Device was previously registered to GCM");
                }
            } catch (Exception e) {
                e(TAG, "Error getting gcmCallback and/or senderId", e);
            }

        } else if (ACTION_UNREGISTER.equals(action)) {
            GCMRegistrar.unregister(context);
            GCMRegistrar.onDestroy(context);

        } else {
            e(TAG, "Unknown plugin action [" + action + "]");
            success = false;
        }

        return success;
    }

    @Override
    public void onPause(boolean multitasking) {
        super.onPause(multitasking);

        foreground = false;
    }

    @Override
    public void onResume(boolean multitasking) {
        super.onResume(multitasking);

        foreground = true;
    }

    private static void showToast(final String message) {
        activity.runOnUiThread(new Runnable() {
            public void run() {
                Toast.makeText(activity, message, Toast.LENGTH_SHORT).show();
            }
        });
    }

    public static void sendToCordova(String name) {
        sendToCordova(name, Collections.EMPTY_MAP);
    }

    public static void sendToCordova(String name, String key, String value) {
        Map<String, Object> dataMap = new HashMap<String, Object>();
        dataMap.put(key, value);
        sendToCordova(name, dataMap);
    }

    public static void sendToCordova(String name, Map<String, Object> dataMap) {
        try {
            JSONObject json = new JSONObject();
            for (Map.Entry<String, Object> entry : dataMap.entrySet()) {
                json.put(entry.getKey(), entry.getValue());
            }
            sendToCordova(name, json);
        } catch (JSONException e) {
            Log.e(TAG, "Error processing GCM message", e);
        }
    }

    private static void sendToCordova(String name, JSONObject json) {
        if (foreground) {
            foregroundHandler(name, json);
        } else {
            backgroundHandler(name, json);
        }
    }

    private static void backgroundHandler(String name, JSONObject json) {
        showToast(name);
        d(TAG, name + " - " + json.toString());
    }

    private static void foregroundHandler(String name, JSONObject json) {
        if (gcmCallback == null) {
            // TODO: FIX THIS - detect app foreground/backgroun & do native notification
            Log.e(TAG, "Cannot send JavaScript to Cordova (gcmCallback is null)");
        } else {
            String script = "javascript:" + gcmCallback + "(\"" + name + "\", " + json.toString() + ")";
            Log.d(TAG, script);
            staticWebView.sendJavascript(script);
        }
    }

}
